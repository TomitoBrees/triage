import { Body, Controller, Post } from "@nestjs/common";
import { CreatePatientQuestionnaireDto } from "./dto/create-patient-questionnaire.dto";

@Controller("patient-questionnaires")
export class PatientQuestionnairesController {
	@Post()
	create(@Body() dto: CreatePatientQuestionnaireDto) {
		return {
			id: crypto.randomUUID(),
			status: "received" as const,
			receivedAt: new Date().toISOString(),
			triage: {
				hasCriticalSymptom: Boolean(dto.criticalSymptom),
				hasModerateSymptom: Boolean(dto.moderateSymptom),
			},
		};
	}
}
