import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { FrenchScoreService } from './scoring/french-score.service';

@Module({
	controllers: [PatientController],
	providers: [PatientService, FrenchScoreService],
})
export class PatientModule {}
