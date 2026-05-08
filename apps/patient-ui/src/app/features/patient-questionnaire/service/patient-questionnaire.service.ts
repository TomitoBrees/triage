import { inject, Injectable, signal } from "@angular/core";
import { PatientQuestionnaireApi } from "./patient-questionnaire.api";
import { Answer } from "../types/patient-questionnaire.types";
import { firstValueFrom } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PatientQuestionnaireService {
	public submitError = signal<string | null>(null);
	public submitStatus = signal<"idle" | "submitting" | "submitted">("idle");

	private readonly patientQuestionnaireApi = inject(PatientQuestionnaireApi);

	public async submitAnswer(answer: Answer) {
		this.submitError.set(null);
		this.submitStatus.set("submitting");

		try {
			const patient = await firstValueFrom(this.patientQuestionnaireApi.submit(answer));
			this.submitStatus.set("submitted");
			return patient;
		} catch (error) {
			this.submitStatus.set("idle");
			this.submitError.set("Impossible d'envoyer vos informations. Merci de reessayer.");
			throw error;
		}
	}
}
