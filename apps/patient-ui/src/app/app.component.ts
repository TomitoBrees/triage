import { Component } from "@angular/core";
import { HeaderBar } from "./layout/header-bar/header-bar.component";
import { PatientFormControllerComponent } from "./features/patient-form-controller/patient-form-controller.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	imports: [HeaderBar, PatientFormControllerComponent],
})
export class AppComponent {}
