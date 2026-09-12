import { Component, computed, input } from "@angular/core";
import { NgClass } from "@angular/common";

import { PatientDetail } from "../../services/patient-detail";

const PAIN_SCALE_MAX = 10;
const HIGH_PAIN_THRESHOLD = 7;
const MODERATE_PAIN_THRESHOLD = 4;

@Component({
	selector: "app-patient-pain-scale",
	imports: [NgClass],
	templateUrl: "./patient-pain-scale.component.html",
	styleUrl: "./patient-pain-scale.component.scss",
})
export class PatientPainScale {
	public patient = input.required<PatientDetail>();

	protected readonly max = PAIN_SCALE_MAX;

	protected pain = computed(() => {
		const value = this.patient().sharedAnswers?.["painScale"];
		return typeof value === "number" ? value : null;
	});

	protected level = computed(() => {
		const pain = this.pain();
		if (pain === null) return "-empty";
		if (pain >= HIGH_PAIN_THRESHOLD) return "-high";
		if (pain >= MODERATE_PAIN_THRESHOLD) return "-moderate";
		return "-low";
	});

	protected fillWidth = computed(() => {
		const pain = this.pain();
		return pain === null ? "0%" : `${(pain / PAIN_SCALE_MAX) * 100}%`;
	});
}
