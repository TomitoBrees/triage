import { Component } from '@angular/core';
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";

@Component({
  selector: 'app-patient-questions',
  imports: [SymptomButtonComponent, Button],
  templateUrl: './patient-questions.component.html',
  styleUrl: './patient-questions.component.scss',
})
export class PatientQuestionsComponent {

}
