export type StepId = "critical-symptoms" | "moderate-symptoms" | "personal-information";

export type PatientSymptomId =
	| "chestPain"
	| "breathingDifficulty"
	| "suddenSpeechDifficulty"
	| "facialDrooping"
	| "severeBleeding"
	| "swellingFaceLipsThroat"
	| "fainting"
	| "weaknessArmLeg"
	| "confusion"
	| "headInjury"
	| "sucidalIdeation"
	| "abdominalPainPregnant";

export type PersonalInformation = {
	firstName: string;
	lastName: string;
	age: number;
	isMale: boolean;
};

export type Answer = {
	criticalSymptom?: PatientSymptomId;
	moderateSymptom?: PatientSymptomId;
	personalInformation?: PersonalInformation;
};

export type PatientQuestion = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: PatientSymptomId;
};
