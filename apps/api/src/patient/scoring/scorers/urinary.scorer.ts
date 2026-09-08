import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const FEVER_ANSWERS = ["yes", "idk"];
const TORSION_SIGNS = ["highRidingTestis", "swollenHardScrotum", "nausea", "multipleSigns"];
const ACTIVE_HEAVY_BLEEDING = ["activeHeavy", "idk"];
const SEVERE_PAIN = 7;
const MILD_PAIN = 1;

export class UrinaryScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "urinary";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const urinaryProblem = specificAnswers.urinaryProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (urinaryProblem) {
			case "flankPain":
				return this.scoreFlankPain(sharedAnswers, painScale);
			case "urinaryRetention":
				return this.scoreUrinaryRetention(painScale);
			case "scrotalPain":
				return this.scoreScrotalPain(sharedAnswers, specificAnswers, painScale);
			case "catheterProblem":
				return this.scoreCatheterDysfunction(specificAnswers, painScale);
			case "hematuria":
				return this.scoreHematuria(specificAnswers);
			case "dysuria":
				return this.scoreDysuria(specificAnswers);
			case "genitalLesion":
				return this.scoreGenitalLesion(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreFlankPain(
		sharedAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const regressivePain =
			sharedAnswers.stillHere === "no" ||
			sharedAnswers.evolution === "better" ||
			painScale <= MILD_PAIN;

		if (painScale >= SEVERE_PAIN) {
			return 2;
		}
		if (regressivePain) {
			return 5;
		}
		return 3;
	}

	private scoreUrinaryRetention(painScale: number): number {
		return painScale >= SEVERE_PAIN ? 2 : 3;
	}

	private scoreScrotalPain(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const scrotalPainSigns = specificAnswers.scrotalPainSigns as string | undefined;
		const torsionSuspicion =
			sharedAnswers.startMotive === "brutally" ||
			TORSION_SIGNS.includes(scrotalPainSigns ?? "");

		if (painScale >= SEVERE_PAIN || torsionSuspicion) {
			return 2;
		}
		return 3;
	}

	private scoreCatheterDysfunction(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		if (painScale >= SEVERE_PAIN || this.hasFever(specificAnswers)) {
			return 2;
		}
		return 3;
	}

	private scoreHematuria(specificAnswers: Record<string, PatientAnswerValue>): number {
		const hematuriaSeverity = specificAnswers.hematuriaSeverity as string | undefined;

		return ACTIVE_HEAVY_BLEEDING.includes(hematuriaSeverity ?? "") ? 2 : 3;
	}

	private scoreDysuria(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.hasFever(specificAnswers) ? 3 : 5;
	}

	private scoreGenitalLesion(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.hasFever(specificAnswers) ? 3 : 5;
	}

	private hasFever(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const urinaryFever = specificAnswers.urinaryFever as string | undefined;

		return FEVER_ANSWERS.includes(urinaryFever ?? "");
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
