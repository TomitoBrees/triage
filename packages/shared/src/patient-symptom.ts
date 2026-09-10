export const criticalSymptoms = [
	"chestPain",
	"breathingDifficulty",
	"suddenSpeechDifficulty",
	"facialDrooping",
	"severeBleeding",
	"swellingFaceLipsThroat",
	"weaknessArmLeg",
] as const;

export const moderateSymptoms = ["headInjury", "sucidalIdeation", "abdominalPainPregnant"] as const;

export const generalSymptoms = [
	"traumatological",
	"abdominal",
	"cardiac",
	"respiratory",
	"infection",
	"neurological",
	"urinary",
	"gynecological",
	"dermatological",
	"ent",
	"psychological",
	"intoxication",
	"generalWeakness",
] as const;

export const patientSymptoms = [
	...criticalSymptoms,
	...moderateSymptoms,
	...generalSymptoms,
] as const;

export type PatientSymptom = (typeof patientSymptoms)[number];

export type CriticalSymptom = (typeof criticalSymptoms)[number];
export type ModerateSymptom = (typeof moderateSymptoms)[number];
export type GeneralSymptom = (typeof generalSymptoms)[number];
