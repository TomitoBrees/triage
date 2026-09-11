import { Component, computed, input } from "@angular/core";
import { criticalSymptoms, sharedAnswerLabel } from "@triage/shared";

import { PatientDetail } from "../../services/patient-detail";

const EMPTY_VALUE = "—";

@Component({
	selector: "app-patient-summary",
	imports: [],
	templateUrl: "./patient-summary.component.html",
	styleUrl: "./patient-summary.component.scss",
})
export class PatientSummary {
	public patient = input.required<PatientDetail>();

	protected facts = computed(() => {
		const answers = this.patient().sharedAnswers ?? {};

		return [
			{ label: "Motif d'arrivée", value: this.arrivalReason() },
			{
				label: "Début des symptômes",
				value: sharedAnswerLabel("startTime", answers["startTime"]),
			},
			{
				label: "Mode d'apparition",
				value: sharedAnswerLabel("startMotive", answers["startMotive"]),
			},
			{ label: "Évolution", value: sharedAnswerLabel("evolution", answers["evolution"]) },
		].map((fact) => ({ ...fact, value: fact.value ?? EMPTY_VALUE }));
	});

	private arrivalReason(): string | null {
		const symptom = this.patient().symptom;
		if (!symptom) return null;

		return criticalSymptoms.includes(symptom as (typeof criticalSymptoms)[number])
			? "Symptôme critique déclaré"
			: "Parcours symptôme général";
	}
}
