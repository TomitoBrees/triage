import { Component, input, output, signal } from "@angular/core";
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";
import { InfoBoxComponent } from "../../shared/ui/info-box/info-box.component";
import type {
	SymptomQuestion,
	PatientSymptomId,
} from "../patient-questionnaire/types/patient-questionnaire.types";

@Component({
	selector: "app-symptom-questions",
	imports: [SymptomButtonComponent, Button, InfoBoxComponent],
	templateUrl: "./symptom-questions.component.html",
	styleUrl: "./symptom-questions.component.scss",
})
export class SymptomQuestionsComponent {
	public questions = input<SymptomQuestion[]>([]);
	public infoBox = input<boolean>(false);

	public completed = output<{ symptom: PatientSymptomId | null }>();

	protected selectedSymptom = signal<PatientSymptomId | null>(null);

	protected submit() {
		this.completed.emit({ symptom: this.selectedSymptom() });
	}
}
