import { Component, computed, inject, input } from "@angular/core";

import { PatientPageHeader } from "../patient-page-header/patient-page-header.component";
import { PatientScoreService } from "../../services/patient-score.service";
import { type FrenchTier } from "../../shared/utils/french-tier.util";
import { type PatientStatus } from "../../shared/utils/patient-status.util";

@Component({
	selector: "app-patient-page",
	imports: [PatientPageHeader],
	templateUrl: "./patient-page.component.html",
	styleUrl: "./patient-page.component.scss",
})
export class PatientPage {
	public id = input.required<string>();

	private readonly patientScoreService = inject(PatientScoreService);

	protected patient = computed(
		() =>
			this.patientScoreService.patients().find((patient) => patient.id === this.id()) ?? null,
	);

	protected updateStatus(status: PatientStatus): void {
		this.patientScoreService.updatePatient(this.id(), { status });
	}

	protected updateFrench(french: FrenchTier): void {
		this.patientScoreService.updatePatient(this.id(), { french });
	}
}
