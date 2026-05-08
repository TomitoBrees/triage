import { Component, computed, inject, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { SymptomQuestionsComponent } from "../symptom-questions/symptom-questions.component";
import { criticalQuestions as criticalSymptomQuestions } from "./types/patient-questionnaire.questions";
import type { PatientResponse } from "./service/patient-questionnaire.api";
import type {
	Answer,
	CriticalSymptomId,
	PersonalInformation,
	StepId,
} from "./types/patient-questionnaire.types";
import { PatientIdentificationComponent } from "../patient-identification/patient-identification.component";
import { PatientQuestionnaireService } from "./service/patient-questionnaire.service";
import { DialogService } from "../../shared/ui/dialog/dialog.service";

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
	protected submittedPatient = signal<PatientResponse | null>(null);

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

	private readonly patientQuestionnaireService = inject(PatientQuestionnaireService);
	private readonly dialogService = inject(DialogService);
	protected readonly submitStatus = this.patientQuestionnaireService.submitStatus;
	protected readonly submitError = this.patientQuestionnaireService.submitError;

	protected handleCriticalCompleted(answer: { criticalSymptom: CriticalSymptomId | null }) {
		this.updateAnswer({ criticalSymptom: answer.criticalSymptom ?? undefined });

		if (this.answer().criticalSymptom) {
			this.currentStep.set("personal-information");
		} else {
			this.currentStep.set("moderate-symptoms");
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
					title: "Symptome d'urgence selectionne",
					message:
						"Ce choix indique une situation qui peut necessiter une prise en charge immediate.",
					confirmLabel: "Continuer",
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
