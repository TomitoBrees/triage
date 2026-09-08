import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const RESPIRATORY_DISTRESS_SIGNS = [
	"blueLips",
	"cannotSpeak",
	"exhausted",
	"confused",
	"multipleSigns",
];
const SEVERE_DYSPNEA = ["whenSpeaking", "chestSucking", "whenLyingDown", "multiple"];
const SEVERE_HEMOPTYSIS = ["abundant", "repeated", "idk"];
const ASSOCIATED_COUGH_SIGNS = [
	"fever",
	"breathlessness",
	"chestPain",
	"wheezing",
	"multipleSigns",
];

export class RespiratoryScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "respiratory";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const respiratoryProblem = specificAnswers.respiratoryProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (respiratoryProblem) {
			case "breathlessness":
				return this.scoreDyspnea(specificAnswers);
			case "asthmaCopd":
				return this.scoreAsthmaCopd(specificAnswers);
			case "bloodInCough":
				return this.scoreHemoptysis(specificAnswers);
			case "chestPainBreathing":
				return this.scorePulmonaryChestPain(specificAnswers);
			case "foreignBody":
				return this.scoreAirwayForeignBody(specificAnswers);
			case "cough":
				return this.scoreCough(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreDyspnea(specificAnswers: Record<string, PatientAnswerValue>): number {
		const oxygenSaturation = specificAnswers.oxygenSaturation as string | undefined;

		if (this.hasRespiratoryDistress(specificAnswers) || oxygenSaturation === "below86") {
			return 1;
		}
		if (this.hasSevereDyspnea(specificAnswers) || oxygenSaturation === "from86To90") {
			return 2;
		}
		return 3;
	}

	private scoreAsthmaCopd(specificAnswers: Record<string, PatientAnswerValue>): number {
		const peakFlow = specificAnswers.peakFlow as string | undefined;
		const asthmaType = specificAnswers.asthmaType as string | undefined;

		if (this.hasRespiratoryDistress(specificAnswers)) {
			return 1;
		}
		if (peakFlow === "below200" || this.hasSevereDyspnea(specificAnswers)) {
			return 2;
		}
		if (peakFlow === "above300" && asthmaType === "asthma") {
			return 4;
		}
		return 3;
	}

	private scoreHemoptysis(specificAnswers: Record<string, PatientAnswerValue>): number {
		const hemoptysisAmount = specificAnswers.hemoptysisAmount as string | undefined;

		if (this.hasRespiratoryDistress(specificAnswers)) {
			return 1;
		}
		if (SEVERE_HEMOPTYSIS.includes(hemoptysisAmount ?? "")) {
			return 2;
		}
		return 3;
	}

	private scorePulmonaryChestPain(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.scoreFromBreathing(specificAnswers);
	}

	private scoreAirwayForeignBody(specificAnswers: Record<string, PatientAnswerValue>): number {
		return this.scoreFromBreathing(specificAnswers);
	}

	private scoreCough(specificAnswers: Record<string, PatientAnswerValue>): number {
		const coughSigns = specificAnswers.coughSigns as string | undefined;

		return ASSOCIATED_COUGH_SIGNS.includes(coughSigns ?? "") ? 3 : 5;
	}

	private scoreFromBreathing(specificAnswers: Record<string, PatientAnswerValue>): number {
		if (this.hasRespiratoryDistress(specificAnswers)) {
			return 1;
		}
		if (this.hasSevereDyspnea(specificAnswers)) {
			return 2;
		}
		return 3;
	}

	private hasRespiratoryDistress(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const respiratoryDistressSigns = specificAnswers.respiratoryDistressSigns as
			| string
			| undefined;

		return RESPIRATORY_DISTRESS_SIGNS.includes(respiratoryDistressSigns ?? "");
	}

	private hasSevereDyspnea(specificAnswers: Record<string, PatientAnswerValue>): boolean {
		const breathingSeverity = specificAnswers.breathingSeverity as string | undefined;

		return SEVERE_DYSPNEA.includes(breathingSeverity ?? "");
	}

	private scoreFromPain(painScale: number): number {
		if (painScale >= 8) {
			return 2;
		}
		if (painScale >= 4) {
			return 3;
		}
		return 5;
	}
}
