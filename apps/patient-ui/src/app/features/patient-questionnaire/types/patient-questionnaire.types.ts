export type StepId =
	| "critical-symptoms"
	| "general-symptoms"
	| "shared-questions"
	| "personal-information";

export type PatientSymptomId =
	| "chestPain"
	| "breathingDifficulty"
	| "suddenSpeechDifficulty"
	| "facialDrooping"
	| "severeBleeding"
	| "swellingFaceLipsThroat"
	| "weaknessArmLeg"
	| "traumatological"
	| "abdominal"
	| "cardiac"
	| "respiratory"
	| "infection"
	| "neurological"
	| "urinary"
	| "gynecological"
	| "dermatological"
	| "ent"
	| "psychological"
	| "intoxication"
	| "generalWeakness";

export type PersonalInformation = {
	firstName: string;
	lastName: string;
	age: number;
	isMale: boolean;
};

export type Answer = {
	criticalSymptom?: PatientSymptomId;
	generalSymptom?: PatientSymptomId;
	personalInformation?: PersonalInformation;
};

export type SymptomQuestion = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: PatientSymptomId;
};

export type PatientQuestion =
	| {
			id: string;
			text: string;
			type: "boolean";
	  }
	| {
			id: string;
			text: string;
			type: "single-choice";
			options: FollowUpOption[];
	  }
	| {
			id: string;
			text: string;
			type: "number";
			min?: number;
			max?: number;
			step?: number;
			minLabel?: string;
			maxLabel?: string;
	  };

export type FollowUpOption = {
	id: string;
	label: string;
};
