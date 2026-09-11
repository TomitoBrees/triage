import { PatientAnswerValue, PatientSymptom } from "./create-patient.dto";
import { PatientStatus } from "./patient-list.dto";

export class PatientDetail {
	id!: string;
	firstName!: string;
	lastName!: string;
	age!: number;
	isMale!: boolean;
	symptom?: PatientSymptom;
	arrivalTime!: Date;
	french!: number;
	status!: PatientStatus;
	symptomDescription?: string;
	sharedAnswers?: Record<string, PatientAnswerValue>;
	specificAnswers?: Record<string, PatientAnswerValue>;
	iaoNote!: string;
}
