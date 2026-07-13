import { ActorSchema } from "../ActorSchema";

const STANDARD_CREATION_KARMA = 25;

function asArray<T>(value: T | T[] | null | undefined): T[] {
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
}

/**
 * Determine the unspent Karma for an imported character.
 *
 * Chummer's creation export does not expose the initial Karma pool in `karma`.
 * Selected qualities carry their signed Karma cost in `bp`; heritage and other
 * automatically granted qualities must not consume the creation pool.
 */
export function calculateChummerKarma(character: ActorSchema): number {
    const exportedKarma = Number(character.karma) || 0;
    if (character.created === 'True') return exportedKarma;

    const qualityCost = asArray(character.qualities?.quality)
        .filter(quality => quality.qualitysource === 'Selected')
        .reduce((total, quality) => total + (Number(quality.bp) || 0), 0);

    return Math.max(STANDARD_CREATION_KARMA - qualityCost, 0);
}
