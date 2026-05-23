import { Component, computed, input, output, signal } from "@angular/core";
import {
	PatientQuestion,
	PatientQuestionAnswer,
} from "../patient-questionnaire/types/patient-questionnaire.types";
import { Button } from "../../shared/ui/button/button.component";
import { SliderComponent } from "../../shared/ui/slider/slider.component";

@Component({
	selector: "app-patient-questions",
	imports: [Button, SliderComponent],
	templateUrl: "./patient-questions.component.html",
	styleUrl: "./patient-questions.component.scss",
})
export class PatientQuestionsComponent {
	public questions = input.required<PatientQuestion[]>();

	public completed = output<Record<string, PatientQuestionAnswer>>();
	public goBack = output<void>();

	protected selectedAnswers = signal<Record<string, string>>({});
	protected numericAnswers = signal<Record<string, number>>({
		painScale: 0,
	});

	protected answers = computed<Record<string, PatientQuestionAnswer>>(() => ({
		...this.selectedAnswers(),
		...this.numericAnswers(),
	}));

	protected visibleQuestions = computed(() =>
		this.questions().filter((question) => this.isQuestionVisible(question)),
	);

	protected visibleAnswers = computed<Record<string, PatientQuestionAnswer>>(() => {
		const visibleQuestionIds = new Set(this.visibleQuestions().map((question) => question.id));

		return Object.fromEntries(
			Object.entries(this.answers()).filter(([questionId]) =>
				visibleQuestionIds.has(questionId),
			),
		);
	});

	protected disableSubmit = computed(() => {
		const answeredQuestionIds = Object.keys(this.visibleAnswers());
		const requiredQuestionIds = this.visibleQuestions().map((q) => q.id);
		return !requiredQuestionIds.every((id) => answeredQuestionIds.includes(id));
	});

	protected setAnswer(questionId: string, answerId: string): void {
		this.selectedAnswers.update((answers) => ({
			...answers,
			[questionId]: answerId,
		}));
	}

	protected setNumericAnswer(questionId: string, value: number): void {
		this.numericAnswers.update((answers) => ({
			...answers,
			[questionId]: value,
		}));
	}

	protected onSubmit(): void {
		this.completed.emit(this.visibleAnswers());
	}

	protected onGoBack(): void {
		this.goBack.emit();
	}

	private isQuestionVisible(question: PatientQuestion): boolean {
		if (!question.conditions?.length) {
			return true;
		}

		return question.conditions.some((condition) => {
			const answer = this.answers()[condition.questionId];
			const expectedAnswers = Array.isArray(condition.answer)
				? condition.answer
				: [condition.answer];

			return expectedAnswers.includes(answer);
		});
	}
}
