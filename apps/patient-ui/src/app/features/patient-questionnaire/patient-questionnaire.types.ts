export type StepId = "critical-symptoms" | "moderate-symptoms" | "personal-information";

export type CriticalSymptomId =
	| "chest-pain"
	| "breathing-difficulty"
	| "sudden-speech-difficulty"
	| "facial-drooping"
	| "severe-bleeding"
	| "swelling-face-lips-throat";

export type ModerateSymptomId =
	| "fainting"
	| "weakness-arm-leg"
	| "confusion"
	| "head-injury"
	| "sucidal-ideation"
	| "abdominal-pain-pregnant";

export type PersonalInformation = {
	firstName: string;
	lastName: string;
	age: number;
	contact: string;
};

export type Answer = {
	criticalSymptom?: CriticalSymptomId;
	moderateSymptom?: ModerateSymptomId;
	personalInformation?: PersonalInformation;
};

export type PatientQuestion<TSymptomId extends CriticalSymptomId | ModerateSymptomId> = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: TSymptomId;
};
