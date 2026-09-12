import { Component, computed, effect, inject, input, signal } from "@angular/core";
import { sharedQuestions, specificQuestionsFor } from "@triage/shared";

import { PatientAnswers } from "../patient-answers/patient-answers.component";
import { PatientIaoNote } from "../patient-iao-note/patient-iao-note.component";
import { PatientPageHeader } from "../patient-page-header/patient-page-header.component";
import { PatientPainScale } from "../patient-pain-scale/patient-pain-scale.component";
import { PatientSummary } from "../patient-summary/patient-summary.component";
import { PatientScoreApi } from "../../services/patient-score.api";
import { PatientScoreService } from "../../services/patient-score.service";
import { type PatientDetail } from "../../services/patient-detail";
import { type FrenchTier } from "../../shared/utils/french-tier.util";
import { type PatientStatus } from "../../shared/utils/patient-status.util";

@Component({
	selector: "app-patient-page",
	imports: [PatientPageHeader, PatientSummary, PatientPainScale, PatientAnswers, PatientIaoNote],
	templateUrl: "./patient-page.component.html",
	styleUrl: "./patient-page.component.scss",
})
export class PatientPage {
	public id = input.required<string>();

	private readonly patientScoreApi = inject(PatientScoreApi);
	private readonly patientScoreService = inject(PatientScoreService);

	protected patient = signal<PatientDetail | null>(null);
	protected notFound = signal(false);

	protected readonly commonQuestions = sharedQuestions.filter(
		(question) => question.id !== "painScale",
	);

	protected specificQuestions = computed(() => specificQuestionsFor(this.patient()?.symptom));

	constructor() {
		effect(() => {
			const id = this.id();

			this.patient.set(null);
			this.notFound.set(false);

			this.patientScoreApi.getPatientById(id).subscribe({
				next: (patient) => this.patient.set(patient),
				error: () => this.notFound.set(true),
			});
		});
	}

	protected updateStatus(status: PatientStatus): void {
		this.patientScoreService.updatePatient(this.id(), { status });
		this.patient.update((patient) => (patient ? { ...patient, status } : patient));
	}

	protected updateFrench(french: FrenchTier): void {
		this.patientScoreService.updatePatient(this.id(), { french });
		this.patient.update((patient) => (patient ? { ...patient, french } : patient));
	}

	protected updateNote(iaoNote: string): void {
		this.patient.update((patient) => (patient ? { ...patient, iaoNote } : patient));
		this.patientScoreApi.updatePatient(this.id(), { iaoNote }).subscribe();
	}
}
