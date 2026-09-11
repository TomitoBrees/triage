import { Patient } from "../../generated/prisma/client";
import { PatientSymptom } from "./dto/create-patient.dto";
import { PatientBaseData, PatientList } from "./dto/patient-list.dto";

function toPatientBaseData(patient: Patient): PatientBaseData {
	return {
		firstName: patient.firstName,
		lastName: patient.lastName,
		age: patient.age,
		isMale: patient.isMale,
		symptom: (patient.symptom as PatientSymptom) ?? undefined,
		arrivalTime: patient.arrivalTime,
		french: patient.french,
		status: patient.status,
	};
}

export function toPatientList(patients: Patient[]): PatientList {
	return patients.map(toPatientBaseData);
}
