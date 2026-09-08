import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const POOR_TOLERANCE = ["drowsiness", "vomiting", "faintness", "breathingTrouble", "multipleSigns"];
const SUICIDAL_INTENT = ["suicidal", "noAnswer"];
const SEVERE_DRUGS = ["cardiacDrugs", "paracetamol", "idk"];
const SEVERE_TOXIC_PRODUCTS = [
	"causticOrCorrosive",
	"gasOrFumes",
	"plantOrMushroom",
	"drug",
	"idk",
];
const SEVERE_WITHDRAWAL = ["agitationOrViolence", "withdrawalSymptoms"];
const SEVERE_DRUNKENNESS = ["agitationOrViolence", "multipleSigns"];
const LATE_PRESENTATION = ["yesterday", "twoToSevenDays", "moreThanAWeek"];

export class IntoxicationScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "intoxication";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const intoxicationProblem = specificAnswers.intoxicationProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (intoxicationProblem) {
			case "drugIntoxication":
				return this.scoreDrugIntoxication(sharedAnswers, specificAnswers);
			case "nonDrugIntoxication":
				return this.scoreNonDrugIntoxication(sharedAnswers, specificAnswers);
			case "withdrawalRequest":
				return this.scoreWithdrawalRequest(specificAnswers);
			case "drunkenness":
				return this.scoreDrunkenness(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreDrugIntoxication(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const intoxicationIntent = specificAnswers.intoxicationIntent as string | undefined;
		const drugType = specificAnswers.drugType as string | undefined;

		if (
			this.hasPoorTolerance(specificAnswers) ||
			SUICIDAL_INTENT.includes(intoxicationIntent ?? "") ||
			SEVERE_DRUGS.includes(drugType ?? "")
		) {
			return 2;
		}
		if (this.isWellToleratedAndSeenLate(sharedAnswers, specificAnswers)) {
			return 5;
		}
		return 3;
	}

	private scoreNonDrugIntoxication(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const toxicProductType = specificAnswers.toxicProductType as string | undefined;

		if (
			this.hasPoorTolerance(specificAnswers) ||
			SEVERE_TOXIC_PRODUCTS.includes(toxicProductType ?? "")
		) {
			return 2;
		}
		if (this.isWellToleratedAndSeenLate(sharedAnswers, specificAnswers)) {
			return 5;
		}
		return 3;
	}

	private scoreWithdrawalRequest(specificAnswers: Record<string, PatientAnswerValue>): number {
		const withdrawalContext = specificAnswers.withdrawalContext as string | undefined;

		if (SEVERE_WITHDRAWAL.includes(withdrawalContext ?? "")) {
			return 2;
		}
		if (withdrawalContext === "prescriptionRequest") {
			return 5;
		}
		return 4;
	}

	private scoreDrunkenness(specificAnswers: Record<string, PatientAnswerValue>): number {
		const drunkennessContext = specificAnswers.drunkennessContext as string | undefined;

		if (SEVERE_DRUNKENNESS.includes(drunkennessContext ?? "")) {
			return 2;
		}
		if (drunkennessContext === "policeRequest") {
			return 3;
		}
		return 4;
	}

	private hasPoorTolerance(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const intoxicationTolerance = specificAnswers.intoxicationTolerance as string | undefined;

		return POOR_TOLERANCE.includes(intoxicationTolerance ?? "");
	}

	private isWellToleratedAndSeenLate(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): boolean {
		const startTime = sharedAnswers.startTime as string | undefined;

		return (
			specificAnswers.intoxicationTolerance === "none" &&
			LATE_PRESENTATION.includes(startTime ?? "")
		);
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
