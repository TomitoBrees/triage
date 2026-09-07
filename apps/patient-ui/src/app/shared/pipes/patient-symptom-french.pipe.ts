import { Pipe, PipeTransform } from "@angular/core";
import type { PatientSymptomId } from "../../features/patient-form-controller/types/patient-form.types";
import { patientSymptomToFrench } from "../utils/patient-symptom-label.util";

@Pipe({
	name: "patientSymptomFrench",
	standalone: true,
})
export class PatientSymptomFrenchPipe implements PipeTransform {
	transform(symptom: PatientSymptomId | null | undefined): string {
		return patientSymptomToFrench(symptom);
	}
}
