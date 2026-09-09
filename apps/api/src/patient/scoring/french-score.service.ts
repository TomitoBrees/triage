import { Inject, Injectable } from "@nestjs/common";
import { SYMPTOM_SCORERS } from "./symptom-scorers.token";
import { SymptomScorer } from "./symptom-scorer.interface";
import { CreatePatientDto } from "../dto/create-patient.dto";

const FRENCH_TO_DETERMINE = 0;

@Injectable()
export class FrenchScoreService {
	constructor(@Inject(SYMPTOM_SCORERS) private readonly scorers: SymptomScorer[]) {}

	public computeFrench(dto: CreatePatientDto): number {
		if (dto.criticalSymptom) return 1;
		if (dto.moderateSymptom) return 2;

		const scorer = this.scorers.find((candidate) => candidate.symptomId === dto.generalSymptom);
		if (scorer) {
			return scorer.computeScore(
				dto.sharedAnswers ?? {},
				dto.specificAnswers ?? {},
				dto.personalInformation,
			);
		}

		if (dto.symptomDescription) return FRENCH_TO_DETERMINE;

		return 5;
	}
}
