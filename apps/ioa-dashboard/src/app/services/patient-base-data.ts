import type { PatientSymptom } from "@triage/shared";

export type PatientBaseData = {
	firstName: string;
	lastName: string;
	age: number;
	isMale: boolean;
	symptom?: PatientSymptom;
	arrivalTime: Date;
	french: number;
};
