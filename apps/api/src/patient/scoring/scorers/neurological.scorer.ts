import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const RECENT_ONSET = ["lessThanAnHour", "oneToSixHours"];
const LONG_DURATION = ["yesterday", "twoToSevenDays", "moreThanAWeek"];
const FEVER_ANSWERS = ["yes", "idk"];
const SEVERE_SEIZURE_CONTEXT = [
	"multipleOrOngoing",
	"postictalConfusion",
	"headTrauma",
	"deficit",
	"multipleSigns",
];
const UNUSUAL_HEADACHE = ["firstEpisode", "unusual", "idk"];
const VERTIGO_NEUROLOGICAL_SIGNS = [
	"speechOrVision",
	"weaknessOrNumbness",
	"suddenHeadache",
	"multipleSigns",
];

export class NeurologicalScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "neurological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const neurologicalProblem = specificAnswers.neurologicalProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (neurologicalProblem) {
			case "alteredConsciousness":
				return 2;
			case "deficit":
				return this.scoreDeficit(sharedAnswers);
			case "seizure":
				return this.scoreSeizure(specificAnswers);
			case "confusion":
				return this.scoreConfusion(specificAnswers);
			case "headache":
				return this.scoreHeadache(sharedAnswers, specificAnswers);
			case "vertigo":
				return this.scoreVertigo(sharedAnswers, specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreDeficit(sharedAnswers: Record<string, PatientAnswerValue>): number {
		const startTime = sharedAnswers.startTime as string | undefined;

		if (RECENT_ONSET.includes(startTime ?? "")) {
			return 1;
		}
		if (LONG_DURATION.includes(startTime ?? "")) {
			return 3;
		}
		return 2;
	}

	private scoreSeizure(specificAnswers: Record<string, PatientAnswerValue>): number {
		const seizureContext = specificAnswers.seizureContext as string | undefined;

		if (
			SEVERE_SEIZURE_CONTEXT.includes(seizureContext ?? "") ||
			this.hasFever(specificAnswers)
		) {
			return 2;
		}
		return 3;
	}

	private scoreConfusion(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.hasFever(specificAnswers) ? 2 : 3;
	}

	private scoreHeadache(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const headacheType = specificAnswers.headacheType as string | undefined;
		const startMotive = sharedAnswers.startMotive as string | undefined;

		if (
			this.hasFever(specificAnswers) ||
			startMotive === "brutally" ||
			UNUSUAL_HEADACHE.includes(headacheType ?? "")
		) {
			return 2;
		}
		return 3;
	}

	private scoreVertigo(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const vertigoAssociatedSigns = specificAnswers.vertigoAssociatedSigns as string | undefined;
		const chronicAndStable =
			sharedAnswers.startTime === "moreThanAWeek" && sharedAnswers.evolution === "stable";

		if (VERTIGO_NEUROLOGICAL_SIGNS.includes(vertigoAssociatedSigns ?? "")) {
			return 2;
		}
		if (chronicAndStable) {
			return 5;
		}
		return 3;
	}

	private hasFever(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const neurologicalFever = specificAnswers.neurologicalFever as string | undefined;

		return FEVER_ANSWERS.includes(neurologicalFever ?? "");
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
