import {
	GeneralSymptom,
	PatientAnswerValue,
	PersonalInformationDto,
} from "../dto/create-patient.dto";

export interface SymptomScorer {
	readonly symptomId: GeneralSymptom;
	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
		personalInformation: PersonalInformationDto,
	): number;
}
