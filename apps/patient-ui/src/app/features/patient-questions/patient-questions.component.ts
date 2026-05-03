import { Component, input, signal } from "@angular/core";
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";
import { InfoBoxComponent } from "../../shared/ui/info-box/info-box.component";

type PatientQuestion = {
	symptomText: string;
	symptomEmoji: string;
};

@Component({
	selector: "app-patient-questions",
	imports: [SymptomButtonComponent, Button, InfoBoxComponent],
	templateUrl: "./patient-questions.component.html",
	styleUrl: "./patient-questions.component.scss",
})
export class PatientQuestionsComponent {
	public title = input<string>("Symptômes d'urgence");
	public description = input<string>(
		"Présentez-vous l'un de ces symptômes nécessitant une prise en charge immédiate ?",
	);

	protected patientQuestions = signal<PatientQuestion[]>([
		{
			symptomText: "Douleur, pression ou serrement dans la poitrine",
			symptomEmoji: "🫀",
		},
		{
			symptomText: "Difficulté à respirer ou essoufflement important au repos",
			symptomEmoji: "🫁",
		},
		{
			symptomText: "Difficulté soudaine à parler ou à comprendre",
			symptomEmoji: "🧠",
		},
		{
			symptomText: "Bouche ou visage qui s'affaisse d'un côté",
			symptomEmoji: "🧠",
		},
		{
			symptomText: "Saignement important qui ne s'arrête pas",
			symptomEmoji: "🩸",
		},
		{
			symptomText:
				"Gonflement du visage, des lèvres ou de la gorge après avoir mangé ou pris un médicament",
			symptomEmoji: "💊",
		},
	]);
}
