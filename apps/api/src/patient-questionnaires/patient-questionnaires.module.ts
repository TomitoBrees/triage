import { Module } from "@nestjs/common";
import { PatientQuestionnairesController } from "./patient-questionnaires.controller";

@Module({
	controllers: [PatientQuestionnairesController],
})
export class PatientQuestionnairesModule {}
