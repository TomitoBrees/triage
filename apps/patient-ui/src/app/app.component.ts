import { Component } from "@angular/core";
import { HeaderBar } from "./layout/header-bar/header-bar.component";
import { Button } from "./shared/ui/button/button.component";
import { PatientQuestionsComponent } from "./features/patient-questions/patient-questions.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [HeaderBar, PatientQuestionsComponent]
})
export class AppComponent {}
