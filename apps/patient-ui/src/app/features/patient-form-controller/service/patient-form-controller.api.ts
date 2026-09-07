import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../core/http/api-url.token";
import type { Answer, PatientSymptomId } from "../types/patient-form-controller.types";

export type PatientResponse = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	french: number;
	symptom: PatientSymptomId | null;
};

@Injectable({ providedIn: "root" })
export class PatientFormControllerApi {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = inject(API_URL);

	submit(answer: Answer) {
		return this.http.post<PatientResponse>(`${this.apiUrl}/patient`, answer);
	}
}
