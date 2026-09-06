import { GeneralSymptom, PatientAnswerValue } from "../dto/create-patient.dto";
import { SymptomScorer } from "./symptom-scorer.interface";

const WOUND_TRAUMA_TYPES = ["cut", "bite", "sting", "foreignObject"];
const LIMB_BODY_PARTS = ["arm", "hand", "feet"];
const HIGH_ENERGY_BODY_PARTS = ["eye", "back", "leg"];

export class TraumaScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "traumatological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const traumaType = specificAnswers.traumaType as string | undefined;
		const bodyPart = specificAnswers.bodyPart as string | undefined;
		const painScale = Number(specificAnswers.painScale ?? sharedAnswers.painScale ?? 0);

		if (traumaType === "burn") {
			return this.scoreBurn(specificAnswers, sharedAnswers);
		}
		if (traumaType === "electrical") {
			return this.scoreElectricShock(specificAnswers);
		}
		if (traumaType && WOUND_TRAUMA_TYPES.includes(traumaType)) {
			return this.scoreWound(specificAnswers);
		}
		if (bodyPart === "head" || bodyPart === "neck") {
			return this.scoreHeadTrauma(specificAnswers);
		}
		if (bodyPart === "thorax" || bodyPart === "abdomen") {
			return this.scoreThoracoAbdominal(specificAnswers, painScale);
		}
		if (bodyPart && HIGH_ENERGY_BODY_PARTS.includes(bodyPart)) {
			return this.scoreHighEnergyRegion(specificAnswers, painScale);
		}
		if (bodyPart && LIMB_BODY_PARTS.includes(bodyPart)) {
			return this.scoreLimb(specificAnswers);
		}

		return this.scoreFromPain(painScale);
	}

	private scoreHeadTrauma(specificAnswers: Record<string, PatientAnswerValue>): number {
		const alarmingSymptoms = specificAnswers.alarmingSymptoms as string | undefined;
		const onAnticoagulant = specificAnswers.anticoagulantTreatment === "yes";

		if (onAnticoagulant) {
			return 2;
		}
		if (
			["convulsion", "motorDifficulties", "somnolence", "vomiting"].includes(
				alarmingSymptoms ?? "",
			)
		) {
			return 2;
		}
		if (["lostConsciousness", "memoryLoss", "headache"].includes(alarmingSymptoms ?? "")) {
			return 3;
		}
		return 5;
	}

	private scoreThoracoAbdominal(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const openWound = specificAnswers.openWound as string | undefined;
		const highSpeed = specificAnswers.highSpeedAccident === "highSpeed";

		if (openWound === "visibleTissue") {
			return 1;
		}
		if (highSpeed) {
			return 2;
		}
		return painScale >= 7 ? 3 : 4;
	}

	private scoreHighEnergyRegion(
		specificAnswers: Record<string, PatientAnswerValue>,
		painScale: number,
	): number {
		const highSpeed = specificAnswers.highSpeedAccident === "highSpeed";

		if (highSpeed) {
			return 2;
		}
		return painScale >= 7 ? 3 : 4;
	}

	private scoreLimb(specificAnswers: Record<string, PatientAnswerValue>): number {
		const limbsSymptoms = specificAnswers.limbsSymptoms as string | undefined;
		const limbsCirculation = specificAnswers.limbsCirculation as string | undefined;
		const highSpeed = specificAnswers.highSpeedAccident === "highSpeed";

		if (
			(limbsSymptoms === "unableToMove" && limbsCirculation === "noSensation") ||
			limbsSymptoms === "deformity" ||
			highSpeed
		) {
			return 2;
		}
		if (limbsSymptoms === "unableToMove" || limbsSymptoms === "deformity") {
			return 3;
		}
		if (limbsCirculation === "noSensation") {
			return 3;
		}
		if (limbsSymptoms === "limitedMovement" || limbsCirculation === "significantTingling") {
			return 4;
		}
		return 5;
	}

	private scoreWound(specificAnswers: Record<string, PatientAnswerValue>): number {
		const openWound = specificAnswers.openWound as string | undefined;
		const bleeding = specificAnswers.bleeding as string | undefined;
		const hand = specificAnswers.bodyPart === "hand";

		if (bleeding === "continuousBleeding" || openWound === "deepWound") {
			return 2;
		}
		if (openWound === "visibleTissue" || openWound === "foreignBodyStuck" || hand) {
			return 3;
		}
		if (openWound === "superficialWound") {
			return 4;
		}
		return 5;
	}

	private scoreBurn(
		specificAnswers: Record<string, PatientAnswerValue>,
		sharedAnswers: Record<string, PatientAnswerValue>,
	): number {
		const bodyPart = specificAnswers.bodyPart as string | undefined;
		const lateConsultation = ["twoToSevenDays", "moreThanAWeek"].includes(
			String(sharedAnswers.startTime ?? ""),
		);

		if (bodyPart === "head" || bodyPart === "hand") {
			return 2;
		}
		if (lateConsultation) {
			return 5;
		}
		return 3;
	}

	private scoreElectricShock(specificAnswers: Record<string, PatientAnswerValue>): number {
		const symptoms = specificAnswers.electricShockSymptoms as string | undefined;
		const source = specificAnswers.electricShockSource as string | undefined;
		const longDuration = specificAnswers.electricShockDuration === "longElectricShock";

		if (symptoms === "lostConsciousness" || symptoms === "burns" || source === "lightning") {
			return 2;
		}
		if (source === "highVoltage" || longDuration) {
			return 3;
		}
		return 4;
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
