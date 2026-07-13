/**
 * Parse a decimal value exported by Chummer in either English or localized form.
 * Chummer uses the current locale's decimal separator in fields such as ware essence.
 */
export function parseChummerDecimal(value: string | null | undefined): number {
    if (!value) return 0;

    const parsed = Number(value.trim().replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
}

/** Parse a whole-Nuyen value with either comma or period thousands separators. */
export function parseChummerNuyen(value: string | null | undefined): number {
    if (!value) return 0;

    const parsed = Number(value.replace(/[.,\s]/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
}

type ChummerCostEntry = {
    cost?: string | null;
    children?: { gear?: ChummerCostEntry | ChummerCostEntry[] | null } | null;
};

/**
 * Calculate a gear item's own cost from Chummer's total cost.
 * Gear `cost` includes direct child gear while the exported `owncost` is not
 * reliable for localized creation exports (it commonly contains the quantity).
 */
export function calculateChummerGearOwnCost(item: ChummerCostEntry): number {
    const totalCost = parseChummerNuyen(item.cost);
    const children = item.children?.gear;
    const childItems = children == null ? [] : Array.isArray(children) ? children : [children];
    const childCost = childItems.reduce((total, child) => total + parseChummerNuyen(child.cost), 0);
    return Math.max(totalCost - childCost, 0);
}

/** Parse capacity supplied by a ware item, including Chummer rating expressions. */
export function parseChummerCapacityTotal(value: string | null | undefined, rating: number): number {
    if (!value || value.startsWith('[')) return 0;
    if (/^\d+$/.test(value.trim())) return Number(value);

    const ratingMultiplier = /Rating\s*\*\s*(\d+)/i.exec(value);
    if (ratingMultiplier) return rating * Number(ratingMultiplier[1]);
    return 0;
}

/** Parse the capacity consumed by an embedded ware modification. */
export function parseChummerCapacitySlots(value: string | null | undefined, rating: number): number {
    if (!value) return 0;
    const inner = value.replace(/[\[\]]/g, '').trim();
    if (inner === '*' || inner === '') return 0;
    if (/^Rating$/i.test(inner)) return rating;
    return Number(inner) || 0;
}
