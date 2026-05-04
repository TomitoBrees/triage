import { Component, computed, signal } from "@angular/core";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";
import { criticalQuestions as criticalSymptomQuestions } from "./patient-questionnaire.questions";
import type { Answer, CriticalSymptomId, StepId } from "./patient-questionnaire.types";
import { PatientIdentificationComponent } from "../patient-identification/patient-identification.component";

type headerAndDescription = {
	header: string;
	description: string;
};
@Component({
	selector: "app-patient-questionnaire",
	imports: [SymptomQuestionsComponent, PatientIdentificationComponent],
	templateUrl: "./patient-questionnaire.component.html",
	styleUrl: "./patient-questionnaire.component.scss",
})
export class PatientQuestionnaireComponent {
	protected currentStep = signal<StepId>("critical-symptoms");
	protected answer = signal<Answer>({});

	protected headerAndDescription = computed<headerAndDescription>(() => {
		switch (this.currentStep()) {
			case "critical-symptoms":
				return {
					header: "Symptômes d'urgence",
					description:
						"Présentez-vous l'un de ces symptômes nécessitant une prise en charge immédiate ?",
				};
			case "moderate-symptoms":
				return {
					header: "Symptômes modérés",
					description:
						"Présentez-vous l'un de ces symptômes nécessitant une prise en charge rapide ?",
				};
			case "personal-information":
				return {
					header: "Informations personnelles",
					description: "Merci de renseigner vos informations personnelles.",
				};
		}
	});

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
