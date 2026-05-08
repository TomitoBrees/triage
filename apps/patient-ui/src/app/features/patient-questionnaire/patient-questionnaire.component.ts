import { Component, computed, inject, signal } from "@angular/core";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";
import {
	criticalQuestions as criticalSymptomQuestions,
	moderateSymptomQuestions,
} from "./types/patient-questionnaire.questions";
import type { PatientResponse } from "./service/patient-questionnaire.api";
import type {
	Answer,
	PatientSymptomId,
	PersonalInformation,
	StepId,
} from "./types/patient-questionnaire.types";
import { PatientIdentificationComponent } from "../patient-identification/patient-identification.component";
import { PatientQuestionnaireService } from "./service/patient-questionnaire.service";
import { DialogService } from "../../shared/ui/dialog/dialog.service";
import { patientSymptomToFrench } from "../../shared/utils/patient-symptom-label.util";

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

	protected criticalQuestions = signal(criticalSymptomQuestions);
	protected moderateQuestions = signal(moderateSymptomQuestions);

	protected submittedPatient = signal<PatientResponse | null>(null);

	protected headerAndDescription = computed<headerAndDescription>(() => {
		switch (this.currentStep()) {
			case "critical-symptoms":
				return {
					header: "Symptômes d'urgence",
					description:
						"Présentez-vous l'un de ces symptômes nécessitant une prise en charge immédiate ?",
				};
			case "other-symptoms":
				return {
					header: "Symptome principal",
					description: "Choisissez ce qui décrit le mieux votre motif de consultation ?",
				};
			case "personal-information":
				return {
					header: "Informations personnelles",
					description: "Merci de renseigner vos informations personnelles.",
				};
			case "moderate-follow-up":
				return {
					header: "Symptômes modérés - Suivi",
					description:
						"Merci de répondre à ces questions complémentaires pour mieux évaluer votre situation.",
				};
		}
	});

	private readonly patientQuestionnaireService = inject(PatientQuestionnaireService);
	private readonly dialogService = inject(DialogService);
	protected readonly submitStatus = this.patientQuestionnaireService.submitStatus;
	protected readonly submitError = this.patientQuestionnaireService.submitError;

	protected handleCriticalCompleted(answer: { symptom: PatientSymptomId | null }) {
		this.updateAnswer({ criticalSymptom: answer.symptom ?? undefined });

		if (this.answer().criticalSymptom) {
			this.currentStep.set("personal-information");
		} else {
			this.currentStep.set("other-symptoms");
		}
	}

	protected handleOtherCompleted(answer: { symptom: PatientSymptomId | null }) {
		this.updateAnswer({ otherSymptom: answer.symptom ?? undefined });

		if (this.answer().criticalSymptom) {
			this.currentStep.set("personal-information");
		} else {
			this.currentStep.set("other-symptoms");
		}
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

		try {
			const patient = await this.patientQuestionnaireService.submitAnswer(this.answer());
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
			}
		} catch {
			this.submittedPatient.set(null);
		}
	}

	private updateAnswer(newAnswer: Partial<Answer>) {
		this.answer.update((currentAnswer) => ({
			...currentAnswer,
			...newAnswer,
		}));
	}
}
