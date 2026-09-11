import { PatientSymptom } from "./create-patient.dto";

export const patientStatuses = ["waiting", "seen", "discharged"] as const;
export type PatientStatus = (typeof patientStatuses)[number];

export class PatientBaseData {
	firstName!: string;
	lastName!: string;
	age!: number;
	isMale!: boolean;
	symptom?: PatientSymptom;
	arrivalTime!: Date;
	french: number;
	status: PatientStatus;
}

export type PatientList = PatientBaseData[];
