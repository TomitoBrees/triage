import { inject, Injectable, signal } from "@angular/core";
import { PatientQuestionnaireApi } from "./patient-questionnaire.api";
import { Answer } from "../types/patient-questionnaire.types";
import { finalize } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PatientQuestionnaireService {
	public submitError = signal<string | null>(null);
	public submitStatus = signal<"idle" | "submitting" | "submitted">("idle");

	private readonly patientQuestionnaireApi = inject(PatientQuestionnaireApi);

	public submitAnswer(answer: Answer) {
		this.submitError.set(null);
		this.submitStatus.set("submitting");

		this.patientQuestionnaireApi
			.submit(answer)
			.pipe(
				finalize(() => {
					if (this.submitStatus() === "submitting") {
						this.submitStatus.set("idle");
					}
				}),
			)
			.subscribe({
				next: () => {
					this.submitStatus.set("submitted");
				},
				error: () => {
					this.submitError.set(
						"Impossible d'envoyer vos informations. Merci de reessayer.",
					);
				},
			});
	}
}
