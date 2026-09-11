import { Component, computed, input, output, signal } from "@angular/core";
import { NgClass } from "@angular/common";

import { PatientBaseData } from "../../services/patient-base-data";
import { PatientSymptomFrenchPipe } from "../../shared/pipes/patient-symptom-french.pipe";
import { elapsedMinutesSince, formatElapsed } from "../../shared/utils/elapsed.util";
import { frenchTiers, toFrenchTier, type FrenchTier } from "../../shared/utils/french-tier.util";
import {
	patientStatusFrenchLabels,
	patientStatuses,
	type PatientStatus,
} from "../../shared/utils/patient-status.util";

@Component({
	selector: "app-patient-page-header",
	imports: [NgClass, PatientSymptomFrenchPipe],
	templateUrl: "./patient-page-header.component.html",
	styleUrl: "./patient-page-header.component.scss",
})
export class PatientPageHeader {
	public patient = input.required<PatientBaseData>();

	public statusChange = output<PatientStatus>();
	public frenchChange = output<FrenchTier>();

	protected readonly statusOptions = patientStatuses;
	protected readonly statusLabels = patientStatusFrenchLabels;
	protected readonly scoreOptions: FrenchTier[] = [1, 2, 3, 4, 5];

	protected scoreEditOpen = signal(false);

	protected scoreEditLabel = computed(() =>
		this.scoreEditOpen() ? "Fermer" : "Corriger le score",
	);

	protected tier = computed(() => toFrenchTier(this.patient().french));

	protected fullName = computed(() => `${this.patient().firstName} ${this.patient().lastName}`);

	protected identity = computed(() => {
		const patient = this.patient();
		return `${patient.age} ans · ${patient.isMale ? "H" : "F"}`;
	});

	protected statusLabel = computed(() => patientStatusFrenchLabels[this.patient().status]);

	protected arrivalLabel = computed(() =>
		new Date(this.patient().arrivalTime).toLocaleTimeString("fr-FR", {
			hour: "2-digit",
			minute: "2-digit",
		}),
	);

	protected elapsedMinutes = computed(() => elapsedMinutesSince(this.patient().arrivalTime));

	protected elapsedLabel = computed(() => formatElapsed(this.elapsedMinutes()));

	protected overdue = computed(() => {
		const limit = frenchTiers[this.tier()].limitMinutes;
		return (
			this.patient().status === "waiting" && limit !== null && this.elapsedMinutes() > limit
		);
	});

	protected toggleScoreEdit(): void {
		this.scoreEditOpen.update((open) => !open);
	}
}
