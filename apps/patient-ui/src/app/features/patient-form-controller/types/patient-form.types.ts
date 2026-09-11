import type { PatientSymptom } from "@triage/shared";

// Le modèle de question vit dans @triage/shared : le dashboard IAO en dérive les
// libellés des réponses. Ce barrel reste le point d'import du formulaire.
export type {
	FollowUpOption,
	PatientQuestion,
	PatientQuestionAnswer,
	PatientQuestionCondition,
} from "@triage/shared";

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

export type SymptomQuestion = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: PatientSymptomId;
};
