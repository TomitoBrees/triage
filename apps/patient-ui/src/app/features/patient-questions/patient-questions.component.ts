import { Component, input } from "@angular/core";
import { PatientQuestion } from "../patient-questionnaire/types/patient-questionnaire.types";
import { Button } from "../../shared/ui/button/button.component";

@Component({
	selector: "app-patient-questions",
	imports: [Button],
	templateUrl: "./patient-questions.component.html",
	styleUrl: "./patient-questions.component.scss",
})
export class PatientQuestionsComponent {
	public questions = input.required<PatientQuestion[]>();

	protected answers: Record<string, string> = {};

	protected setAnswer(questionId: string, answerId: string): void {
		this.answers[questionId] = answerId;
	}
}
