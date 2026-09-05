import { GeneralSymptom, PatientAnswerValue } from "../dto/create-patient.dto";
import { SymptomScorer } from "./symptom-scorer.interface";

export class TraumaScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "traumatological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		//TODO: Grille french pour troma;
		return 1;
	}
}
