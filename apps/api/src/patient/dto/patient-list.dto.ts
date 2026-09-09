import { PatientSymptom } from "./create-patient.dto";

export class PatientBaseData {
	firstName!: string;
	lastName!: string;
	age!: number;
	isMale!: boolean;
	symptom?: PatientSymptom;
	arrivalTime!: Date;
}

export type PatientList = PatientBaseData[];
