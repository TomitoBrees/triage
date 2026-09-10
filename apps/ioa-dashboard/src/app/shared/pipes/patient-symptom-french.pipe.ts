import { Pipe, PipeTransform } from "@angular/core";
import { patientSymptomToFrench, type PatientSymptom } from "@triage/shared";

@Pipe({
	name: "patientSymptomFrench",
})
export class PatientSymptomFrenchPipe implements PipeTransform {
	transform(symptom: PatientSymptom | null | undefined): string {
		return patientSymptomToFrench(symptom);
	}
}
