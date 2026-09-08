import { GeneralSymptom, PatientAnswerValue } from "../../dto/create-patient.dto";
import { SymptomScorer } from "../symptom-scorer.interface";

const BEHAVIOR_EMERGENCY_SIGNS = [
	"agitation",
	"violence",
	"hallucinations",
	"delusion",
	"multipleSigns",
];
const MAJOR_ANXIETY = ["panicAttack", "majorAnxiety"];

export class PsychologicalScorer implements SymptomScorer {
	symptomId: GeneralSymptom = "psychological";

	computeScore(
		sharedAnswers: Record<string, PatientAnswerValue>,
		specificAnswers: Record<string, PatientAnswerValue>,
	): number {
		const psychologicalProblem = specificAnswers.psychologicalProblem as string | undefined;
		const painScale = Number(sharedAnswers.painScale ?? 0);

		switch (psychologicalProblem) {
			case "suicidalThoughts":
				return 2;
			case "behaviorTrouble":
				return this.scoreBehaviorTrouble(specificAnswers);
			case "anxietyOrDepression":
				return this.scoreAnxietyOrDepression(specificAnswers);
			default:
				return this.scoreFromPain(painScale);
		}
	}

	private scoreBehaviorTrouble(specificAnswers: Record<string, PatientAnswerValue>): number {
		const behaviorTroubleSigns = specificAnswers.behaviorTroubleSigns as string | undefined;

		return BEHAVIOR_EMERGENCY_SIGNS.includes(behaviorTroubleSigns ?? "") ? 2 : 3;
	}

	private scoreAnxietyOrDepression(specificAnswers: Record<string, PatientAnswerValue>): number {
		const anxietySeverity = specificAnswers.anxietySeverity as string | undefined;

		return MAJOR_ANXIETY.includes(anxietySeverity ?? "") ? 2 : 4;
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
