import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const OCCLUSION_SIGNS = ["noGasNoStool", "bloatedAndVomiting", "multipleSigns"];
const SWALLOWED_OBJECT_SIGNS = ["unableToSwallow", "drooling", "chestPain"];
const ANAL_PAIN_SIGNS = ["lumpOrPus", "painWhenPassingStool"];
const SEVERE_PAIN = 7;
const MILD_PAIN = 3;

export class AbdomenScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "abdominal";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const abdominalProblem = specificAnswers.abdominalProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (abdominalProblem) {
			case "vomiting":
				return this.scoreVomiting(specificAnswers);
			case "bloodInStool":
				return this.scoreBloodInStool(specificAnswers);
			case "abdominalPain":
				return this.scoreAbdominalPain(sharedAnswers, painScale);
			case "ictere":
			case "stomaProblem":
				return 3;
			case "lump":
				return this.scoreLump(specificAnswers, painScale);
			case "swallowedObject":
				return this.scoreSwallowedObject(specificAnswers);
			case "rectalObject":
				return this.scoreRectalObject(specificAnswers, painScale);
			case "constipation":
				return this.scoreConstipation(specificAnswers);
			case "diarrhea":
				return this.scoreDiarrhea(specificAnswers, painScale);
			case "analPain":
				return this.scoreAnalPain(specificAnswers);
			case "hiccups":
				return this.scoreHiccups(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreVomiting(specificAnswers: Record<string, PatientAnswerValue>): number {
		const bloodVomiting = specificAnswers.bloodVomiting as string | undefined;
		const occlusionSymptoms = specificAnswers.occlusionSymptoms as string | undefined;
		const vomitingFrequency = specificAnswers.vomitingFrequency as string | undefined;

		if (bloodVomiting === "abundantBlood") {
			return 2;
		}
		if (OCCLUSION_SIGNS.includes(occlusionSymptoms ?? "")) {
			return 2;
		}
		if (bloodVomiting === "bloodStreaks") {
			return 3;
		}
		if (occlusionSymptoms === "abdominalPain" || vomitingFrequency === "abundant") {
			return 3;
		}
		return 5;
	}

	private scoreBloodInStool(specificAnswers: Record<string, PatientAnswerValue>): number {
		const bloodInStoolAmount = specificAnswers.bloodInStoolAmount as string | undefined;

		if (bloodInStoolAmount === "stained") {
			return 3;
		}
		return 2;
	}

	private scoreAbdominalPain(
		sharedAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const painIsOver = sharedAnswers.stillHere === "no" || sharedAnswers.evolution === "better";

		if (painScale >= SEVERE_PAIN) {
			return 2;
		}
		if (painIsOver || painScale <= MILD_PAIN) {
			return 5;
		}
		return 3;
	}

	private scoreLump(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const occlusionSymptoms = specificAnswers.occlusionSymptoms as string | undefined;

		if (painScale >= SEVERE_PAIN || OCCLUSION_SIGNS.includes(occlusionSymptoms ?? "")) {
			return 2;
		}
		return 4;
	}

	private scoreSwallowedObject(specificAnswers: Record<string, PatientAnswerValue>): number {
		const symptoms = specificAnswers.swallowedObjectSymptoms as string | undefined;
		const objectType = specificAnswers.swallowedObjectType as string | undefined;

		if (SWALLOWED_OBJECT_SIGNS.includes(symptoms ?? "")) {
			return 2;
		}
		if (objectType === "sharp" || objectType === "battery") {
			return 3;
		}
		return 4;
	}

	private scoreRectalObject(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const rectalBleeding = specificAnswers.rectalObjectSymptoms === "yes";

		if (rectalBleeding || painScale >= SEVERE_PAIN) {
			return 2;
		}
		return 4;
	}

	private scoreConstipation(specificAnswers: Record<string, PatientAnswerValue>): number {
		const occlusionSymptoms = specificAnswers.occlusionSymptoms as string | undefined;

		if (OCCLUSION_SIGNS.includes(occlusionSymptoms ?? "")) {
			return 2;
		}
		if (occlusionSymptoms === "abdominalPain") {
			return 3;
		}
		return 5;
	}

	private scoreDiarrhea(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const diarrheaFrequency = specificAnswers.diarrheaFrequency as string | undefined;

		if (diarrheaFrequency === "abundant" || painScale >= SEVERE_PAIN) {
			return 3;
		}
		return 5;
	}

	private scoreAnalPain(specificAnswers: Record<string, PatientAnswerValue>): number {
		const analPainSigns = specificAnswers.analPainSigns as string | undefined;

		return ANAL_PAIN_SIGNS.includes(analPainSigns ?? "") ? 3 : 5;
	}

	private scoreHiccups(specificAnswers: Record<string, PatientAnswerValue>): number {
		return specificAnswers.hiccupsDuration === "moreThan12Hours" ? 3 : 5;
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
