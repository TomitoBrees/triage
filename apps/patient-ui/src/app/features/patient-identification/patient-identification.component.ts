import { Component, signal } from "@angular/core";
import { form } from "@angular/forms/signals";
import { TextInputComponent } from "../../shared/ui/text-input/text-input.component";

@Component({
	selector: "app-patient-identification",
	imports: [TextInputComponent],
	templateUrl: "./patient-identification.component.html",
	styleUrl: "./patient-identification.component.scss",
})
export class PatientIdentificationComponent {
	protected identificationModel = signal({
		firstName: "",
		lastName: "",
		age: "",
		isMale: true,
	});

	protected identificationForm = form(this.identificationModel);
}
