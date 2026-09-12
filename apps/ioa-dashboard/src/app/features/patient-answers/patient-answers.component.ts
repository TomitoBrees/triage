import { Component, computed, input, signal } from "@angular/core";
import { answerLabel, type PatientQuestion } from "@triage/shared";

import { PatientAnswerValue } from "../../services/patient-detail";

@Component({
	selector: "app-patient-answers",
	imports: [],
	templateUrl: "./patient-answers.component.html",
	styleUrl: "./patient-answers.component.scss",
})
export class PatientAnswers {
	public heading = input.required<string>();
	public questions = input.required<PatientQuestion[]>();
	public answers = input<Record<string, PatientAnswerValue>>({});

	protected open = signal(true);

	protected rows = computed(() => {
		const answers = this.answers();

		return this.questions()
			.map((question) => ({
				question: question.text,
				answer: answerLabel(question, answers[question.id]),
			}))
			.filter((row) => row.answer !== null);
	});

	protected countLabel = computed(() => {
		const count = this.rows().length;
		return `${count} ${count > 1 ? "réponses" : "réponse"}`;
	});

	protected actionLabel = computed(() => (this.open() ? "Replier" : "Afficher"));

	protected toggle(): void {
		this.open.update((open) => !open);
	}
}
