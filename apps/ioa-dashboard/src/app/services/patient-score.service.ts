import { computed, inject, Injectable, signal, WritableSignal } from "@angular/core";
import { PatientScoreApi } from "./patient-score.api";
import { PatientBaseData } from "./patient-base-data";

@Injectable({
	providedIn: "root",
})
export class PatientScoreService {
	public patients: WritableSignal<PatientBaseData[]> = signal([]);

	public frenchOnePatients = computed(() =>
		this.patients().filter((patient) => patient.french === 1),
	);

	public frenchTwoPatients = computed(() =>
		this.patients().filter((patient) => patient.french === 2),
	);

	public frenchThreePatients = computed(() =>
		this.patients().filter((patient) => patient.french === 3),
	);

	public frenchFourPatients = computed(() =>
		this.patients().filter((patient) => patient.french === 4),
	);

	public frenchFivePatients = computed(() =>
		this.patients().filter((patient) => patient.french === 5),
	);

	public unknownPatients = computed(() =>
		this.patients().filter((patient) => patient.french === 0),
	);

	private readonly patientScoreApi = inject(PatientScoreApi);

	constructor() {
		this.patientScoreApi.listAllPatients().subscribe((patients) => {
			this.patients.set(patients);
		});
	}
}
