import { Component } from "@angular/core";
import { HeaderBar } from "./layout/header-bar/header-bar.component";
import { PatientQuestionnaireComponent } from "./features/patient-questionnaire/patient-questionnaire.component";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	imports: [HeaderBar, PatientQuestionnaireComponent],
})
export class AppComponent {}
