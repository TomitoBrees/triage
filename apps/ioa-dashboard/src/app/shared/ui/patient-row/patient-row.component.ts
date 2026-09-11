import { Component, computed, input, output } from "@angular/core";
import { NgClass } from "@angular/common";

import { PatientBaseData } from "../../../services/patient-base-data";
import { PatientSymptomFrenchPipe } from "../../pipes/patient-symptom-french.pipe";
import { elapsedMinutesSince, formatElapsed } from "../../utils/elapsed.util";
import { frenchTiers, toFrenchTier } from "../../utils/french-tier.util";
import { patientStatusFrenchLabels, type PatientStatus } from "../../utils/patient-status.util";

@Component({
	selector: "app-patient-row",
	imports: [NgClass, PatientSymptomFrenchPipe],
	templateUrl: "./patient-row.component.html",
	styleUrl: "./patient-row.component.scss",
})
export class PatientRow {
	public patient = input.required<PatientBaseData>();
	public selected = input<boolean>(false);

	public select = output<void>();

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
}
