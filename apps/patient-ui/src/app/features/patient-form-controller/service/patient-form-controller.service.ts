import { inject, Injectable, signal } from "@angular/core";
import { PatientFormControllerApi } from "./patient-form-controller.api";
import { Answer } from "../types/patient-form-controller.types";
import { firstValueFrom } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class PatientFormControllerService {
	public submitError = signal<string | null>(null);
	public submitStatus = signal<"idle" | "submitting" | "submitted">("idle");

	private readonly patientFormControllerApi = inject(PatientFormControllerApi);

	public async submitAnswer(answer: Answer) {
		this.submitError.set(null);
		this.submitStatus.set("submitting");

		try {
			const patient = await firstValueFrom(this.patientFormControllerApi.submit(answer));
			this.submitStatus.set("submitted");
			return patient;
		} catch (error) {
			this.submitStatus.set("idle");
			this.submitError.set("Impossible d'envoyer vos informations. Merci de reessayer.");
			throw error;
		}
	}
}
