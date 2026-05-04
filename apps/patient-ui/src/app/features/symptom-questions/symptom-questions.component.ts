import { Component, input, output, signal } from "@angular/core";
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";
import { InfoBoxComponent } from "../../shared/ui/info-box/info-box.component";
import type {
	CriticalSymptomId,
	PatientQuestion,
} from "../patient-questionnaire/patient-questionnaire.types";

@Component({
	selector: "app-symptom-questions",
	imports: [SymptomButtonComponent, Button, InfoBoxComponent],
	templateUrl: "./symptom-questions.component.html",
	styleUrl: "./symptom-questions.component.scss",
})
export class SymptomQuestionsComponent {
	public heading = input<string>("Symptômes d'urgence");
	public description = input<string>(
		"Présentez-vous l'un de ces symptômes nécessitant une prise en charge immédiate ?",
	);
	public questions = input<PatientQuestion<CriticalSymptomId>[]>([]);

	public completed = output<{ criticalSymptom: CriticalSymptomId | null }>();

	protected selectedSymptom = signal<CriticalSymptomId | null>(null);

	protected submit() {
		this.completed.emit({ criticalSymptom: this.selectedSymptom() });
	}
}
