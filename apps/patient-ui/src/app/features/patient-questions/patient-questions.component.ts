import { Component, computed, input, output, signal } from "@angular/core";
import { PatientQuestion } from "../patient-questionnaire/types/patient-questionnaire.types";
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

	public submitted = output<Record<string, string | number>>();
	public goBack = output<void>();

	protected selectedAnswers = signal<Record<string, string>>({});
	protected numericAnswers = signal({
		painScale: 0,
	});

	protected answers = computed<Record<string, string | number>>(() => ({
		...this.selectedAnswers(),
		...this.numericAnswers(),
	}));

	protected disableSubmit = computed(() => {
		const answeredQuestionIds = Object.keys(this.answers());
		const requiredQuestionIds = this.questions().map((q) => q.id);
		return !requiredQuestionIds.every((id) => answeredQuestionIds.includes(id));
	});

	protected setAnswer(questionId: string, answerId: string): void {
		this.selectedAnswers.update((answers) => ({
			...answers,
			[questionId]: answerId,
		}));
	}

	protected setNumericAnswer(questionId: "painScale", value: number): void {
		this.numericAnswers.update((answers) => ({
			...answers,
			[questionId]: value,
		}));
	}

	protected onSubmit(): void {
		this.submitted.emit(this.answers());
	}

	protected onGoBack(): void {
		this.goBack.emit();
	}
}
