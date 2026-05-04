import { Component, signal } from "@angular/core";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";

type StepId = "critical-symptoms" | "moderate-symptoms" | "personal-information";

export type CriticalSymptomId =
	| "chest-pain"
	| "breathing-difficulty"
	| "sudden-speech-difficulty"
	| "facial-drooping"
	| "severe-bleeding"
	| "swelling-face-lips-throat";

export type ModerateSymptomId =
	| "fainting"
	| "weakness-arm-leg"
	| "confusion"
	| "head-injury"
	| "sucidal-ideation"
	| "abdominal-pain-pregnant";

type PersonalInformation = {
	firstName: string;
	lastName: string;
	age: number;
	contact: string;
};

type Answer = {
	criticalSymptom?: CriticalSymptomId;
	moderateSymptom?: ModerateSymptomId;
	personalInformation?: PersonalInformation;
};

export type PatientQuestion<TSymptomId extends CriticalSymptomId | ModerateSymptomId> = {
	symptomText: string;
	symptomEmoji: string;
	symptomId: TSymptomId;
};

@Component({
	selector: "app-patient-questionnaire",
	imports: [SymptomQuestionsComponent],
	templateUrl: "./patient-questionnaire.component.html",
	styleUrl: "./patient-questionnaire.component.scss",
})
export class PatientQuestionnaireComponent {
	protected currentStep = signal<StepId>("critical-symptoms");
	protected answer = signal<Answer>({});

	protected criticalQuestions = signal<PatientQuestion<CriticalSymptomId>[]>([
		{
			symptomText: "Douleur, pression ou serrement dans la poitrine",
			symptomEmoji: "🫀",
			symptomId: "chest-pain",
		},
		{
			symptomText: "Difficulté à respirer ou essoufflement important au repos",
			symptomEmoji: "🫁",
			symptomId: "breathing-difficulty",
		},
		{
			symptomText: "Difficulté soudaine à parler ou à comprendre",
			symptomEmoji: "🧠",
			symptomId: "sudden-speech-difficulty",
		},
		{
			symptomText: "Bouche ou visage qui s'affaisse d'un côté",
			symptomEmoji: "🧠",
			symptomId: "facial-drooping",
		},
		{
			symptomText: "Saignement important qui ne s'arrête pas",
			symptomEmoji: "🩸",
			symptomId: "severe-bleeding",
		},
		{
			symptomText:
				"Gonflement du visage, des lèvres ou de la gorge après avoir mangé ou pris un médicament",
			symptomEmoji: "💊",
			symptomId: "swelling-face-lips-throat",
		},
	]);

	protected handleCriticalCompleted(answer: { criticalSymptom: CriticalSymptomId | null }) {
		this.updateAnswer({ criticalSymptom: answer.criticalSymptom ?? undefined });

		if (this.answer().criticalSymptom) {
			this.currentStep.set("personal-information");
		} else {
			this.currentStep.set("moderate-symptoms");
		}
	}

	private updateAnswer(newAnswer: Partial<Answer>) {
		this.answer.update((currentAnswer) => ({
			...currentAnswer,
			...newAnswer,
		}));
	}
}
