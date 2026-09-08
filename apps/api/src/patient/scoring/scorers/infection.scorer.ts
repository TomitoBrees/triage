import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const HIGH_RISK_TEMPERATURES = ["above40", "below352"];
const SEVERE_FEVER_SIGNS = ["confusion", "headache", "purpura", "multipleSigns"];
const POOR_FEVER_TOLERANCE = [
	"faintness",
	"lowBloodPressure",
	"pulseAboveBloodPressure",
	"multipleSigns",
];
const VITAL_CONTAGION_NOT_EXCLUDED = ["lifeThreatening", "none", "idk"];

export class InfectionScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "infection";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const infectionProblem = specificAnswers.infectionProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (infectionProblem) {
			case "bloodExposure":
				return this.scoreBloodExposure(specificAnswers);
			case "fever":
				return this.scoreFever(specificAnswers);
			case "contagiousContact":
				return this.scoreContagiousExposure(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreBloodExposure(specificAnswers: Record<string, PatientAnswerValue>): number {
		const exposureDelay = specificAnswers.exposureDelay as string | undefined;
		const exposureSourceStatus = specificAnswers.exposureSourceStatus as string | undefined;

		if (exposureSourceStatus === "hivPositive" && exposureDelay !== "over48h") {
			return 2;
		}
		if (exposureDelay === "over48h") {
			return 5;
		}
		return 4;
	}

	private scoreFever(specificAnswers: Record<string, PatientAnswerValue>): number {
		const temperature = specificAnswers.temperature as string | undefined;
		const feverSigns = specificAnswers.feverSigns as string | undefined;
		const feverTolerance = specificAnswers.feverTolerance as string | undefined;

		if (
			HIGH_RISK_TEMPERATURES.includes(temperature ?? "") ||
			SEVERE_FEVER_SIGNS.includes(feverSigns ?? "")
		) {
			return 2;
		}
		if (POOR_FEVER_TOLERANCE.includes(feverTolerance ?? "")) {
			return 3;
		}
		return 5;
	}

	private scoreContagiousExposure(specificAnswers: Record<string, PatientAnswerValue>): number {
		const contagiousDiseaseRisk = specificAnswers.contagiousDiseaseRisk as string | undefined;

		return VITAL_CONTAGION_NOT_EXCLUDED.includes(contagiousDiseaseRisk ?? "idk") ? 3 : 5;
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
