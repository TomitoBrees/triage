import type { PatientBaseData } from "./patient-base-data";

export type PatientAnswerValue = string | number | boolean;

export type PatientDetail = PatientBaseData & {
	symptomDescription?: string;
	sharedAnswers?: Record<string, PatientAnswerValue>;
	specificAnswers?: Record<string, PatientAnswerValue>;
	iaoNote: string;
};
