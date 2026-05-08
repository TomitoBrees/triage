import { Component, signal } from "@angular/core";
import { form } from "@angular/forms/signals";
import { TextInputComponent } from "../../shared/ui/text-input/text-input.component";
import { NumberInputComponent } from "../../shared/ui/number-input/number-input.component";
import { SwitchComponent } from "../../shared/ui/switch/switch.component";
import { Button } from "../../shared/ui/button/button.component";

@Component({
	selector: "app-patient-identification",
	imports: [TextInputComponent, NumberInputComponent, SwitchComponent, Button],
	templateUrl: "./patient-identification.component.html",
	styleUrl: "./patient-identification.component.scss",
})
export class PatientIdentificationComponent {
	protected identificationModel = signal({
		firstName: "",
		lastName: "",
		age: 0,
		isMale: true,
	});

	protected identificationForm = form(this.identificationModel);
}
