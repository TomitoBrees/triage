import type { PatientSymptom } from "@triage/shared";

export type PatientSymptomId = PatientSymptom;

export type StepId =
	| "critical-symptoms"
	| "general-symptoms"
	| "shared-questions"
	| "personal-information"
	| "specific-questions"
	| "symptom-description";

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
	sharedAnswers?: Record<string, string | number | boolean>;
	specificAnswers?: Record<string, string | number | boolean>;
	symptomDescription?: string;
};

export type PatientQuestionAnswer = string | number | boolean;

export type PatientQuestionCondition = {
	questionId: string;
	answer: PatientQuestionAnswer | PatientQuestionAnswer[];
};

export type SymptomQuestion = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: PatientSymptomId;
};

type PatientQuestionBase = {
	id: string;
	text: string;
	conditions?: PatientQuestionCondition[];
	requireAllConditions?: boolean;
};

export type PatientQuestion =
	| (PatientQuestionBase & {
			type: "boolean";
	  })
	| (PatientQuestionBase & {
			type: "single-choice";
			options: FollowUpOption[];
	  })
	| (PatientQuestionBase & {
			type: "number";
			min?: number;
			max?: number;
			step?: number;
			minLabel?: string;
			maxLabel?: string;
	  });

export type FollowUpOption = {
	id: string;
	label: string;
};
