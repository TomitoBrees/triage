import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../../../core/http/api-url.token";
import type { Answer } from "../types/patient-questionnaire.types";

export type PatientSymptomResponse =
	| "chestPain"
	| "breathingDifficulty"
	| "suddenSpeechDifficulty"
	| "facialDrooping"
	| "severeBleeding"
	| "swellingFaceLipsThroat"
	| "fainting"
	| "weaknessArmLeg"
	| "confusion"
	| "headInjury"
	| "sucidalIdeation"
	| "abdominalPainPregnant";

export type PatientResponse = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	french: number;
	symptom: PatientSymptomResponse | null;
};

@Injectable({ providedIn: "root" })
export class PatientQuestionnaireApi {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = inject(API_URL);

	submit(answer: Answer) {
		return this.http.post<PatientResponse>(`${this.apiUrl}/patient`, answer);
	}
}
