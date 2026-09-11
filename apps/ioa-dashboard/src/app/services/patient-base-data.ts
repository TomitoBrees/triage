import type { PatientSymptom } from "@triage/shared";
import { PatientStatus } from "../shared/utils/patient-status.util";

export type PatientBaseData = {
	firstName: string;
	lastName: string;
	age: number;
	isMale: boolean;
	symptom?: PatientSymptom;
	arrivalTime: Date;
	french: number;
	status: PatientStatus
};
