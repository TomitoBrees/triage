import { Component, output, signal } from "@angular/core";
import { form, maxLength, minLength, required } from "@angular/forms/signals";
import { TextAreaComponent } from "../../shared/ui/text-area/text-area.component";
import { Button } from "../../shared/ui/button/button.component";

const DESCRIPTION_MAX_LENGTH = 500;

@Component({
	selector: "app-patient-symptom-description",
	imports: [TextAreaComponent, Button],
	templateUrl: "./patient-symptom-description.component.html",
	styleUrl: "./patient-symptom-description.component.scss",
})
export class PatientSymptomDescriptionComponent {
	public completed = output<string>();
	public goBack = output<void>();

	protected descriptionModel = signal({
		description: "",
	});

	protected descriptionForm = form(this.descriptionModel, (schemaPath) => {
		required(schemaPath.description, { message: "Merci de décrire votre problème" });
		minLength(schemaPath.description, 10, {
			message: "Merci de décrire votre problème en quelques mots",
		});
		maxLength(schemaPath.description, DESCRIPTION_MAX_LENGTH, {
			message: `Votre description ne doit pas dépasser ${DESCRIPTION_MAX_LENGTH} caractères`,
		});
	});

	protected onSubmit() {
		this.completed.emit(this.descriptionModel().description.trim());
	}

	protected onGoBack() {
		this.goBack.emit();
	}
}
