import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const FEVER_ANSWERS = ["yes", "idk"];
const HEAVY_BLEEDING = ["heavy", "idk"];
const DEAFNESS = ["hearingLoss", "multipleSigns"];
const SEVERE_SWELLING_SIGNS = ["redHotSkin", "swallowingTrouble", "rapidGrowth", "multipleSigns"];
const SEVERE_DENTAL_SIGNS = ["swellingOrPus", "painDespitePainkillers", "multipleSigns"];
const SEVERE_PAIN = 7;

export class EntScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "ent";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const entArea = specificAnswers.entArea as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (entArea) {
			case "eye":
				return this.scoreEyeProblem(sharedAnswers, specificAnswers, painScale);
			case "earNoseThroat":
				return this.scoreEntProblem(sharedAnswers, specificAnswers, painScale);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreEyeProblem(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const eyeProblem = specificAnswers.eyeProblem as string | undefined;

		switch (eyeProblem) {
			case "eyeInjury":
				return this.scoreEyeInjury(specificAnswers, painScale);
			case "visionTrouble":
				return this.scoreVisionTrouble(sharedAnswers);
			case "redEye":
				return 5;
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreEntProblem(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const entProblem = specificAnswers.entProblem as string | undefined;

		switch (entProblem) {
			case "nosebleed":
				return this.scoreEpistaxis(sharedAnswers, specificAnswers);
			case "hearingTrouble":
				return this.scoreHearingTrouble(sharedAnswers, specificAnswers);
			case "neckSwelling":
				return this.scoreNeckSwelling(specificAnswers);
			case "entForeignBody":
				return this.scoreEntForeignBody(specificAnswers);
			case "earache":
				return 5;
			case "soreThroat":
				return this.scoreSoreThroat(specificAnswers, painScale);
			case "nasalObstruction":
				return this.scoreNasalObstruction(specificAnswers);
			case "dentalProblem":
				return this.scoreDentalProblem(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreEyeInjury(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		if (specificAnswers.eyeInjuryType === "chemical" || painScale >= SEVERE_PAIN) {
			return 2;
		}
		return 3;
	}

	private scoreVisionTrouble(sharedAnswers: Record<string, PatientAnswerValue>): number {
		return sharedAnswers.startMotive === "brutally" ? 2 : 3;
	}

	private scoreEpistaxis(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const nosebleedAmount = specificAnswers.nosebleedAmount as string | undefined;
		const heavyBleeding = HEAVY_BLEEDING.includes(nosebleedAmount ?? "");
		const stoppedBleeding = sharedAnswers.stillHere === "no";

		if (heavyBleeding && !stoppedBleeding) {
			return 2;
		}
		if (heavyBleeding) {
			return 3;
		}
		if (nosebleedAmount === "light" && stoppedBleeding) {
			return 5;
		}
		return 3;
	}

	private scoreHearingTrouble(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const hearingTroubleType = specificAnswers.hearingTroubleType as string | undefined;
		const suddenOnset = sharedAnswers.startMotive === "brutally";

		return DEAFNESS.includes(hearingTroubleType ?? "") && suddenOnset ? 2 : 4;
	}

	private scoreNeckSwelling(specificAnswers: Record<string, PatientAnswerValue>): number {
		const neckSwellingLocalSigns = specificAnswers.neckSwellingLocalSigns as string | undefined;

		if (
			this.hasFever(specificAnswers) ||
			SEVERE_SWELLING_SIGNS.includes(neckSwellingLocalSigns ?? "")
		) {
			return 3;
		}
		return 4;
	}

	private scoreEntForeignBody(specificAnswers: Record<string, PatientAnswerValue>): number {
		return specificAnswers.entForeignBodyBreathing === "yes" ? 2 : 4;
	}

	private scoreSoreThroat(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		if (
			specificAnswers.swallowingAbility === "cannotSwallowAnything" ||
			painScale >= SEVERE_PAIN
		) {
			return 3;
		}
		return 5;
	}

	private scoreNasalObstruction(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.hasFever(specificAnswers) ? 3 : 5;
	}

	private scoreDentalProblem(specificAnswers: Record<string, PatientAnswerValue>): number {
		const dentalSigns = specificAnswers.dentalSigns as string | undefined;

		return SEVERE_DENTAL_SIGNS.includes(dentalSigns ?? "") ? 3 : 5;
	}

	private hasFever(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const entFever = specificAnswers.entFever as string | undefined;

		return FEVER_ANSWERS.includes(entFever ?? "");
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
