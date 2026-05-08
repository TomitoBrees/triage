export type StepId =
	| "critical-symptoms"
	| "other-symptoms"
	| "moderate-follow-up"
	| "personal-information";

export type PatientSymptomId =
	| "chestPain"
	| "breathingDifficulty"
	| "suddenSpeechDifficulty"
	| "facialDrooping"
	| "severeBleeding"
	| "swellingFaceLipsThroat"
	| "weaknessArmLeg"
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
	otherSymptom?: PatientSymptomId;
	personalInformation?: PersonalInformation;
};

export type PatientQuestion = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: PatientSymptomId;
};
