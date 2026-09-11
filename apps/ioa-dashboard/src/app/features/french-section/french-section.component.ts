import { Component, computed, input, output } from "@angular/core";
import { NgClass } from "@angular/common";

import { PatientBaseData } from "../../services/patient-base-data";
import { PatientRow } from "../../shared/ui/patient-row/patient-row.component";
import {
	FRENCH_TO_DETERMINE,
	frenchTiers,
	type FrenchTier,
} from "../../shared/utils/french-tier.util";

@Component({
	selector: "app-french-section",
	imports: [NgClass, PatientRow],
	templateUrl: "./french-section.component.html",
	styleUrl: "./french-section.component.scss",
})
export class FrenchSection {
	public tier = input.required<FrenchTier>();
	public patients = input.required<PatientBaseData[]>();
	public selectedPatientId = input<string | null>(null);

	public select = output<PatientBaseData>();

	protected heading = computed(() => {
		const tier = this.tier();
		const { label } = frenchTiers[tier];
		return tier === FRENCH_TO_DETERMINE ? label : `${tier} · ${label}`;
	});

	protected sortedPatients = computed(() =>
		[...this.patients()].sort(
			(a, b) => new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime(),
		),
	);
}
