import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const EARLY_PREGNANCY_WARNING_SIGNS = ["bleeding", "pain", "multipleSigns"];
const LATE_PREGNANCY_WARNING_SIGNS = [
	"bleeding",
	"pain",
	"waterBreaking",
	"highBloodPressure",
	"multipleSigns",
];
const MENOMETRORRHAGIA_WARNING_CONTEXT = ["pregnant", "heavyBleeding", "multipleSigns"];
const INFECTED_BREAST = ["inflammation", "abscess"];

export class GynecologicalScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "gynecological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const gynecologicalProblem = specificAnswers.gynecologicalProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (gynecologicalProblem) {
			case "imminentDelivery":
				return 1;
			case "pregnancyIssue":
				return this.scorePregnancyIssue(specificAnswers);
			case "menometrorrhagia":
				return this.scoreMenometrorrhagia(specificAnswers);
			case "postpartumIssue":
				return this.scorePostpartumIssue(specificAnswers);
			case "breastProblem":
				return this.scoreBreastAnomaly(specificAnswers);
			case "vulvovaginalProblem":
				return 5;
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scorePregnancyIssue(specificAnswers: Record<string, PatientAnswerValue>): number {
		const pregnancyStage = specificAnswers.pregnancyStage as string | undefined;

		if (pregnancyStage === "earlyStage") {
			return this.scoreEarlyPregnancy(specificAnswers);
		}
		return this.scoreLatePregnancy(specificAnswers);
	}

	private scoreEarlyPregnancy(specificAnswers: Record<string, PatientAnswerValue>): number {
		const pregnancySignsEarly = specificAnswers.pregnancySignsEarly as string | undefined;

		return EARLY_PREGNANCY_WARNING_SIGNS.includes(pregnancySignsEarly ?? "") ? 2 : 3;
	}

	private scoreLatePregnancy(specificAnswers: Record<string, PatientAnswerValue>): number {
		const pregnancySignsLate = specificAnswers.pregnancySignsLate as string | undefined;

		return LATE_PREGNANCY_WARNING_SIGNS.includes(pregnancySignsLate ?? "") ? 2 : 3;
	}

	private scoreMenometrorrhagia(specificAnswers: Record<string, PatientAnswerValue>): number {
		const menometrorrhagiaContext = specificAnswers.menometrorrhagiaContext as
			| string
			| undefined;

		return MENOMETRORRHAGIA_WARNING_CONTEXT.includes(menometrorrhagiaContext ?? "") ? 2 : 3;
	}

	private scorePostpartumIssue(specificAnswers: Record<string, PatientAnswerValue>): number {
		return specificAnswers.postpartumBreastfeedingFever === "breastfeedingWithFever" ? 3 : 4;
	}

	private scoreBreastAnomaly(specificAnswers: Record<string, PatientAnswerValue>): number {
		const breastProblemType = specificAnswers.breastProblemType as string | undefined;

		return INFECTED_BREAST.includes(breastProblemType ?? "") ? 3 : 5;
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
