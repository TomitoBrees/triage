import { Component, computed, inject, signal } from "@angular/core";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";
import {
	criticalSymptoms,
	generalSymptoms,
	sharedQuestions,
	traumaQuestions,
} from "./types/patient-form-controller.questions";
import type { PatientResponse } from "./service/patient-form-controller.api";
import type {
	Answer,
	PatientQuestion,
	PatientQuestionAnswer,
	PatientSymptomId,
	PersonalInformation,
	StepId,
} from "./types/patient-form-controller.types";
import { PatientIdentificationComponent } from "../patient-identification/patient-identification.component";
import { PatientFormControllerService } from "./service/patient-form-controller.service";
import { DialogService } from "../../shared/ui/dialog/dialog.service";
import { patientSymptomToFrench } from "../../shared/utils/patient-symptom-label.util";
import { PatientQuestionsComponent } from "../patient-questions/patient-questions.component";

type headerAndDescription = {
	header: string;
	description: string;
};
@Component({
	selector: "app-patient-form-controller",
	imports: [SymptomQuestionsComponent, PatientIdentificationComponent, PatientQuestionsComponent],
	templateUrl: "./patient-form-controller.component.html",
	styleUrl: "./patient-form-controller.component.scss",
})
export class PatientFormControllerComponent {
	protected currentStep = signal<StepId>("critical-symptoms");
	protected answer = signal<Answer>({});

	protected criticalQuestions = signal(criticalSymptoms);
	protected generalSymptoms = signal(generalSymptoms);

	protected sharedQuestions = signal<PatientQuestion[]>(sharedQuestions);

	protected specificQuestions = computed<PatientQuestion[]>(() => {
		const symptom = this.answer().generalSymptom;

		switch (symptom) {
			case "traumatological":
				return traumaQuestions;
			default:
				return [];
		}
	});

	protected submittedPatient = signal<PatientResponse | null>(null);

	protected headerAndDescription = computed<headerAndDescription>(() => {
		switch (this.currentStep()) {
			case "critical-symptoms":
				return {
					header: "Symptômes d'urgence",
					description:
						"Présentez-vous l'un de ces symptômes nécessitant une prise en charge immédiate ?",
				};
			case "general-symptoms":
				return {
					header: "Symptome principal",
					description: "Choisissez ce qui décrit le mieux votre motif de consultation ?",
				};
			case "shared-questions":
				return {
					header: "Questions complémentaires",
					description: "Ces informations aident à mieux évaluer votre situation",
				};
			case "personal-information":
				return {
					header: "Informations personnelles",
					description: "Merci de renseigner vos informations personnelles.",
				};

			case "specific-questions":
				return {
					header: "Questions spécifiques",
					description:
						"Merci de répondre à ces questions complémentaires en fonction de votre symptôme principal.",
				};
		}
	});

	private readonly patientFormControllerService = inject(PatientFormControllerService);
	private readonly dialogService = inject(DialogService);
	protected readonly submitStatus = this.patientFormControllerService.submitStatus;
	protected readonly submitError = this.patientFormControllerService.submitError;

	protected handleCriticalCompleted(answer: { symptom: PatientSymptomId | null }) {
		this.updateAnswer({ criticalSymptom: answer.symptom ?? undefined });
		this.currentStep.set("personal-information");
	}

	protected async handlePersonalInfoCompleted(info: PersonalInformation) {
		this.updateAnswer({
			personalInformation: {
				firstName: info.firstName,
				lastName: info.lastName,
				age: info.age,
				isMale: info.isMale,
			},
		});

		if (!this.answer().criticalSymptom) {
			this.currentStep.set("general-symptoms");
			return;
		}

		this.submitAnswer();
	}

	protected handleGeneralCompleted(answer: { symptom: PatientSymptomId | null }) {
		this.updateAnswer({ generalSymptom: answer.symptom ?? undefined });
		this.currentStep.set("shared-questions");
	}

	protected handleSharedCompleted(answers: Record<string, PatientQuestionAnswer>) {
		this.updateAnswer({ sharedAnswers: answers });
		this.currentStep.set("specific-questions");
	}

	protected async handleSpecificCompleted(answers: Record<string, PatientQuestionAnswer>) {
		this.updateAnswer({ specificAnswers: answers });
		this.submitAnswer();
	}

	protected handleGoBack() {
		switch (this.currentStep()) {
			case "personal-information":
				this.currentStep.set("critical-symptoms");
				break;
			case "shared-questions":
				this.currentStep.set("general-symptoms");
				break;
			case "specific-questions":
				this.currentStep.set("shared-questions");
				break;
		}
	}

	private updateAnswer(newAnswer: Partial<Answer>) {
		this.answer.update((currentAnswer) => ({
			...currentAnswer,
			...newAnswer,
		}));
	}

	private async submitAnswer() {
		try {
			const patient = await this.patientFormControllerService.submitAnswer(this.answer());
			this.submittedPatient.set(patient);

			if (patient.french === 1) {
				this.dialogService.confirm({
					type: "danger",
					title: "Urgence détectée",
					subtitle: patientSymptomToFrench(patient.symptom),
					message:
						"Veuillez vous diriger immediatement vers le personnel d'accueil des urgences pour une prise en charge rapide.",
					confirmLabel: "Retour au questionnaire",
				});
			} else {
				this.dialogService.confirm({
					type: "regular",
					title: "Réponse enregistrée",
					subtitle: patientSymptomToFrench(patient.symptom),
					message:
						"Votre réponse a bien été enregistrée. Merci de patienter, une infirmière d’accueil vous appellera pour organiser votre prise en charge.",
					confirmLabel: "Retour au questionnaire",
				});
			}
		} catch {
			this.submittedPatient.set(null);
		}
	}
}
