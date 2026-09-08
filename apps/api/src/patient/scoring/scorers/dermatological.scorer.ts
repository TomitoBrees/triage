import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const FEVER_ANSWERS = ["yes", "idk"];
const LARGE_ABSCESS = ["large", "idk"];
const ANAPHYLAXIS_SIGNS = ["throatSwelling", "breathingDifficulty", "faintness", "multipleSigns"];
const SEVERE_LOCAL_BITE_SIGNS = [
	"spreadingRedness",
	"majorSwelling",
	"pusOrWound",
	"multipleSigns",
];
const COMPLEX_FOREIGN_BODY = ["multipleOrDeep", "idk"];
const SEVERE_PAIN = 7;

export class DermatologicalScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "dermatological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const dermatologicalProblem = specificAnswers.dermatologicalProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (dermatologicalProblem) {
			case "spontaneousBruise":
				return 3;
			case "abscess":
				return this.scoreSkinAbscess(specificAnswers);
			case "rashOrSwelling":
				return this.scoreRashOrSwelling(specificAnswers, painScale);
			case "biteOrSting":
				return this.scoreBiteOrSting(specificAnswers);
			case "foreignBody":
				return this.scoreSubcutaneousForeignBody(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreSkinAbscess(specificAnswers: Record<string, PatientAnswerValue>): number {
		const abscessSize = specificAnswers.abscessSize as string | undefined;

		if (this.hasFever(specificAnswers) || LARGE_ABSCESS.includes(abscessSize ?? "")) {
			return 3;
		}
		return 4;
	}

	private scoreRashOrSwelling(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const anaphylaxisSigns = specificAnswers.anaphylaxisSigns as string | undefined;

		if (ANAPHYLAXIS_SIGNS.includes(anaphylaxisSigns ?? "")) {
			return 2;
		}
		if (this.hasFever(specificAnswers) || painScale >= SEVERE_PAIN) {
			return 3;
		}
		return this.scoreFromExtent(specificAnswers);
	}

	private scoreBiteOrSting(specificAnswers: Record<string, PatientAnswerValue>): number {
		const biteType = specificAnswers.biteType as string | undefined;
		const biteLocalSigns = specificAnswers.biteLocalSigns as string | undefined;

		if (biteType === "venomousAnimal") {
			return 2;
		}
		if (
			this.hasFever(specificAnswers) ||
			SEVERE_LOCAL_BITE_SIGNS.includes(biteLocalSigns ?? "")
		) {
			return 3;
		}
		return this.scoreFromExtent(specificAnswers);
	}

	private scoreSubcutaneousForeignBody(
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const foreignBodyComplexity = specificAnswers.foreignBodyComplexity as string | undefined;

		return COMPLEX_FOREIGN_BODY.includes(foreignBodyComplexity ?? "") ? 3 : 5;
	}

	private scoreFromExtent(specificAnswers: Record<string, PatientAnswerValue>): number {
		return specificAnswers.skinExtent === "extended" ? 4 : 5;
	}

	private hasFever(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const skinFever = specificAnswers.skinFever as string | undefined;

		return FEVER_ANSWERS.includes(skinFever ?? "");
	}

	private scoreFromPain(painScale: number): number {
		if (painScale >= 8) {
			return 3;
		}
		if (painScale >= 4) {
			return 4;
		}
		return 5;
	}
}
