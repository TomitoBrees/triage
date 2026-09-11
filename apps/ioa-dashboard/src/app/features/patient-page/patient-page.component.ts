import { Component, computed, inject, input } from "@angular/core";

import { PatientScoreService } from "../../services/patient-score.service";

@Component({
	selector: "app-patient-page",
	imports: [],
	templateUrl: "./patient-page.component.html",
	styleUrl: "./patient-page.component.scss",
})
export class PatientPage {
	public id = input.required<string>();

	private readonly patientScoreService = inject(PatientScoreService);

	protected patient = computed(() =>
		this.patientScoreService.patients().find((patient) => patient.id === this.id()) ?? null,
	);
}
