import { Component, input } from '@angular/core';
import { SymptomButtonComponent } from "./symptom-button/symptom-button.component";
import { Button } from "../../shared/ui/button/button.component";

@Component({
  selector: 'app-patient-questions',
  imports: [SymptomButtonComponent, Button],
  templateUrl: './patient-questions.component.html',
  styleUrl: './patient-questions.component.scss',
})
export class PatientQuestionsComponent {
  public title = input<string>('Symptômes d\'urgence');
  public description = input<string>('Présentez-vous l\'un de ces symptômes nécessitant une prise en charge immédiate ?');
}
