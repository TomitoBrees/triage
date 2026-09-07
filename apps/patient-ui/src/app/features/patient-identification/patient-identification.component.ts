import { Component, output, signal } from "@angular/core";
import { form, min, required } from "@angular/forms/signals";
import { TextInputComponent } from "../../shared/ui/text-input/text-input.component";
import { NumberInputComponent } from "../../shared/ui/number-input/number-input.component";
import { SwitchComponent } from "../../shared/ui/switch/switch.component";
import { Button } from "../../shared/ui/button/button.component";
import { PersonalInformation } from "../patient-form-controller/types/patient-form-controller.types";

@Component({
	selector: "app-patient-identification",
	imports: [TextInputComponent, NumberInputComponent, SwitchComponent, Button],
	templateUrl: "./patient-identification.component.html",
	styleUrl: "./patient-identification.component.scss",
})
export class PatientIdentificationComponent {
	public completed = output<PersonalInformation>();
	public goBack = output<void>();

	protected identificationModel = signal({
		firstName: "",
		lastName: "",
		age: 0,
		isMale: true,
	});

	protected identificationForm = form(this.identificationModel, (schemaPath) => {
		required(schemaPath.firstName, { message: "Le prénom est requis" });
		required(schemaPath.lastName, { message: "Le nom est requis" });
		min(schemaPath.age, 0, { message: "L'âge est requis" });
	});

	protected onSubmit() {
		this.completed.emit(this.identificationModel());
	}

	protected onGoBack() {
		this.goBack.emit();
	}
}
