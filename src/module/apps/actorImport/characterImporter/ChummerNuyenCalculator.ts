import { ActorSchema } from "../ActorSchema";
import { parseChummerNuyen } from "../itemImporter/ChummerNumberParser";

type CostEntry = { cost: string };
type LifestyleEntry = { totalcost: string };

function asArray<T>(value: T | T[] | null | undefined): T[] {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
}

/**
 * Determine the Nuyen that should be placed on an imported actor.
 *
 * Before career mode, Chummer exports the complete resources budget in `nuyen`.
 * Top-level `cost` values already include quantities and nested components, so only
 * those values are subtracted. In career mode, `nuyen` is the current balance.
 */
export function calculateChummerNuyen(character: ActorSchema): number {
    const exportedNuyen = parseChummerNuyen(character.nuyen);
    if (character.created === 'True') return exportedNuyen;

    const purchases: CostEntry[] = [
        ...asArray(character.armors?.armor),
        ...asArray(character.weapons?.weapon),
        ...asArray(character.cyberwares?.cyberware),
        ...asArray(character.gears?.gear),
        ...asArray(character.vehicles?.vehicle),
    ];
    const purchaseCost = purchases.reduce((total, item) => total + parseChummerNuyen(item.cost), 0);
    const lifestyleCost = asArray<LifestyleEntry>(character.lifestyles?.lifestyle)
        .reduce((total, lifestyle) => total + parseChummerNuyen(lifestyle.totalcost), 0);

    return Math.max(exportedNuyen - purchaseCost - lifestyleCost, 0);
}
