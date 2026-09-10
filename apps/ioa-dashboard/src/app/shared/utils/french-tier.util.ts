export const FRENCH_TO_DETERMINE = 0;

export type FrenchTier = 0 | 1 | 2 | 3 | 4 | 5;

export type FrenchTierInfo = {
	label: string;
	delay: string;
	limitMinutes: number | null;
};

export const frenchTiers: Record<FrenchTier, FrenchTierInfo> = {
	0: { label: "À déterminer", delay: "à évaluer", limitMinutes: null },
	1: { label: "Prise en charge immédiate", delay: "immédiat", limitMinutes: 0 },
	2: { label: "Très urgent", delay: "≤ 20 min", limitMinutes: 20 },
	3: { label: "Urgent", delay: "≤ 60 min", limitMinutes: 60 },
	4: { label: "Peu urgent", delay: "≤ 120 min", limitMinutes: 120 },
	5: { label: "Non urgent", delay: "≤ 240 min", limitMinutes: 240 },
};

export function toFrenchTier(french: number): FrenchTier {
	return french >= 1 && french <= 5 ? (french as FrenchTier) : FRENCH_TO_DETERMINE;
}
