import { Component, input, output, signal } from "@angular/core";
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";
import { InfoBoxComponent } from "../../shared/ui/info-box/info-box.component";
import type {
	PatientQuestion,
	PatientSymptomId,
} from "../patient-questionnaire/types/patient-questionnaire.types";

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
	public questions = input<PatientQuestion[]>([]);

	public completed = output<{ criticalSymptom: PatientSymptomId | null }>();

	protected selectedSymptom = signal<PatientSymptomId | null>(null);

	protected submit() {
		this.completed.emit({ criticalSymptom: this.selectedSymptom() });
	}
}
