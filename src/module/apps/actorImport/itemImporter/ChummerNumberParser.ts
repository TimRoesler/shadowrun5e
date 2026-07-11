/**
 * Parse a decimal value exported by Chummer in either English or localized form.
 * Chummer uses the current locale's decimal separator in fields such as ware essence.
 */
export function parseChummerDecimal(value: string | null | undefined): number {
    if (!value) return 0;

    const parsed = Number(value.trim().replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
}
