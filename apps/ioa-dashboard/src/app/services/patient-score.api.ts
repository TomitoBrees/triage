import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../core/http/api-url.token";
import { PatientBaseData } from "./patient-base-data";
import { PatientDetail } from "./patient-detail";

@Injectable({ providedIn: "root" })
export class PatientScoreApi {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = inject(API_URL);

	listAllPatients() {
		return this.http.get<PatientBaseData[]>(`${this.apiUrl}/patient`);
	}

	getPatientById(id: string) {
		return this.http.get<PatientDetail>(`${this.apiUrl}/patient/${id}`);
	}

	updatePatient(id: string, changes: Partial<Pick<PatientBaseData, "status" | "french">>) {
		return this.http.patch<PatientDetail>(`${this.apiUrl}/patient/${id}`, changes);
	}
}
