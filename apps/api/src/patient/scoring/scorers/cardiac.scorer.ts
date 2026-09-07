import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const TYPICAL_CHEST_PAIN = ["tightness", "radiating", "idk"];
const CORONARY_HISTORY = ["knownHeartDisease", "riskFactors", "idk"];
const ISCHEMIA_SIGNS = ["blueOrPurple", "unableToMove", "noSensation", "multipleSigns"];
const SEVERE_DYSPNEA = ["whenSpeaking", "whenLyingDown", "multiple"];
const HYPERTENSION_SIGNS = ["headache", "visionProblem", "nosebleed", "chestPain", "multipleSigns"];
const HEART_RATE_UNDER_100 = ["normal", "slow", "verySlow"];
const LONG_DURATION = ["yesterday", "twoToSevenDays", "moreThanAWeek"];
const SEVERE_PAIN = 7;

export class CardiacScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "cardiac";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const cardiacProblem = specificAnswers.cardiacProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (cardiacProblem) {
			case "chestPain":
				return this.scoreChestPain(sharedAnswers, specificAnswers, painScale);
			case "coldPaleLimb":
				return this.scoreLimbIschemia(sharedAnswers, specificAnswers);
			case "faintness":
				return 3;
			case "palpitations":
				return this.scoreHeartRhythm(specificAnswers);
			case "breathlessness":
				return this.scoreBreathlessness(specificAnswers);
			case "deviceProblem":
				return this.scoreDeviceProblem(specificAnswers);
			case "legSwelling":
				return this.scoreLegSwelling(sharedAnswers);
			case "hotRedLimb":
				return this.scorePhlebitis(painScale);
			case "highBloodPressure":
				return this.scoreHighBloodPressure(specificAnswers);
			case "lowBloodPressure":
				return this.scoreLowBloodPressure(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreChestPain(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const chestPainType = specificAnswers.chestPainType as string | undefined;
		const heartHistory = specificAnswers.heartHistory as string | undefined;
		const typicalPain = TYPICAL_CHEST_PAIN.includes(chestPainType ?? "idk");
		const coronaryHistory = CORONARY_HISTORY.includes(heartHistory ?? "idk");
		const persistentPain = sharedAnswers.stillHere !== "no" || painScale >= SEVERE_PAIN;

		if (typicalPain && persistentPain) {
			return 2;
		}
		if (typicalPain || coronaryHistory) {
			return 3;
		}
		return 4;
	}

	private scoreLimbIschemia(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const limbIschemiaSigns = specificAnswers.limbIschemiaSigns as string | undefined;
		const longDuration = LONG_DURATION.includes(String(sharedAnswers.startTime ?? ""));

		if (ISCHEMIA_SIGNS.includes(limbIschemiaSigns ?? "") || !longDuration) {
			return 2;
		}
		return 3;
	}

	private scoreHeartRhythm(specificAnswers: Record<string, PatientAnswerValue>): number {
		const heartRate = specificAnswers.heartRate as string | undefined;
		const fainting = specificAnswers.cardiacFainting !== "no";

		if (heartRate === "veryFast" || heartRate === "verySlow") {
			return 1;
		}
		if (heartRate === "fast") {
			return 2;
		}
		if (heartRate === "slow") {
			return fainting ? 2 : 3;
		}
		if (heartRate === "slightlyFast") {
			return 3;
		}
		return fainting ? 3 : 4;
	}

	private scoreBreathlessness(specificAnswers: Record<string, PatientAnswerValue>): number {
		const breathlessnessSeverity = specificAnswers.breathlessnessSeverity as string | undefined;

		return SEVERE_DYSPNEA.includes(breathlessnessSeverity ?? "") ? 2 : 3;
	}

	private scoreDeviceProblem(specificAnswers: Record<string, PatientAnswerValue>): number {
		return specificAnswers.deviceShocks === "no" ? 3 : 2;
	}

	private scoreLegSwelling(sharedAnswers: Record<string, PatientAnswerValue>): number {
		return sharedAnswers.startTime === "moreThanAWeek" ? 4 : 3;
	}

	private scorePhlebitis(painScale: number): number {
		return painScale >= SEVERE_PAIN ? 3 : 4;
	}

	private scoreHighBloodPressure(specificAnswers: Record<string, PatientAnswerValue>): number {
		const highBloodPressureValue = specificAnswers.highBloodPressureValue as string | undefined;
		const highBloodPressureSigns = specificAnswers.highBloodPressureSigns as string | undefined;

		if (highBloodPressureValue === "above220") {
			return 2;
		}
		if (highBloodPressureValue === "below180") {
			return 4;
		}
		return HYPERTENSION_SIGNS.includes(highBloodPressureSigns ?? "") ? 2 : 3;
	}

	private scoreLowBloodPressure(specificAnswers: Record<string, PatientAnswerValue>): number {
		const lowBloodPressureValue = specificAnswers.lowBloodPressureValue as string | undefined;
		const heartRate = specificAnswers.heartRate as string | undefined;

		if (lowBloodPressureValue === "below70") {
			return 1;
		}
		if (lowBloodPressureValue === "below90") {
			return 2;
		}
		if (lowBloodPressureValue === "below100") {
			return HEART_RATE_UNDER_100.includes(heartRate ?? "") ? 3 : 2;
		}
		if (lowBloodPressureValue === "above100") {
			return 3;
		}
		return 2;
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
