import { Component, signal } from "@angular/core";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";
import { criticalQuestions as criticalSymptomQuestions } from "./patient-questionnaire.questions";
import type { Answer, CriticalSymptomId, StepId } from "./patient-questionnaire.types";

@Component({
	selector: "app-patient-questionnaire",
	imports: [SymptomQuestionsComponent],
	templateUrl: "./patient-questionnaire.component.html",
	styleUrl: "./patient-questionnaire.component.scss",
})
export class PatientQuestionnaireComponent {
	protected currentStep = signal<StepId>("critical-symptoms");
	protected answer = signal<Answer>({});

	protected criticalQuestions = signal(criticalSymptomQuestions);

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
