import { Component, computed, inject, output, signal } from "@angular/core";

import { FrenchSection } from "../../features/french-section/french-section.component";
import { PatientBaseData } from "../../services/patient-base-data";
import { PatientScoreService } from "../../services/patient-score.service";
import { FRENCH_TO_DETERMINE, type FrenchTier } from "../../shared/utils/french-tier.util";

type FrenchSectionData = {
	tier: FrenchTier;
	patients: PatientBaseData[];
};

@Component({
	selector: "app-dashboard-sidebar",
	imports: [FrenchSection],
	templateUrl: "./dashboard-sidebar.component.html",
	styleUrl: "./dashboard-sidebar.component.scss",
})
export class DashboardSidebar {
	public patientSelect = output<PatientBaseData>();

	private readonly patientScoreService = inject(PatientScoreService);

	protected selectedPatient = signal<PatientBaseData | null>(null);

	protected sections = computed(() => {
		const sections: FrenchSectionData[] = [
			{ tier: 1, patients: this.patientScoreService.frenchOnePatients() },
			{ tier: 2, patients: this.patientScoreService.frenchTwoPatients() },
			{ tier: 3, patients: this.patientScoreService.frenchThreePatients() },
			{ tier: 4, patients: this.patientScoreService.frenchFourPatients() },
			{ tier: 5, patients: this.patientScoreService.frenchFivePatients() },
			{ tier: FRENCH_TO_DETERMINE, patients: this.patientScoreService.unknownPatients() },
		];

		return sections.filter((section) => section.patients.length > 0);
	});

	protected selectPatient(patient: PatientBaseData): void {
		this.selectedPatient.set(patient);
		this.patientSelect.emit(patient);
	}
}
