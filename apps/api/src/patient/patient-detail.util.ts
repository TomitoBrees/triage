import { Patient } from "../../generated/prisma/client";
import { PatientAnswerValue, PatientSymptom } from "./dto/create-patient.dto";
import { PatientDetail } from "./dto/patient-detail.dto";

export function toPatientDetail(patient: Patient): PatientDetail {
	return {
		id: patient.id,
		firstName: patient.firstName,
		lastName: patient.lastName,
		age: patient.age,
		isMale: patient.isMale,
		symptom: (patient.symptom as PatientSymptom) ?? undefined,
		arrivalTime: patient.arrivalTime,
		french: patient.french,
		status: patient.status,
		symptomDescription: patient.symptomDescription ?? undefined,
		sharedAnswers: (patient.sharedAnswers as Record<string, PatientAnswerValue>) ?? undefined,
		specificAnswers: (patient.specificAnswers as Record<string, PatientAnswerValue>) ?? undefined,
		iaoNote: patient.iaoNote,
	};
}
