import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { FrenchScoreService } from "./scoring/french-score.service";
import { TraumaScorer } from "./scoring/scorers/trauma.scorer";
import { AbdomenScorer } from "./scoring/scorers/abdomen.scorer";
import { SYMPTOM_SCORERS } from "./scoring/symptom-scorers.token";

@Module({
	controllers: [PatientController],
	providers: [
		PatientService,
		FrenchScoreService,
		TraumaScorer,
		AbdomenScorer,
		{
			provide: SYMPTOM_SCORERS,
			useFactory: (trauma: TraumaScorer, abdomen: AbdomenScorer) => [trauma, abdomen],
			inject: [TraumaScorer, AbdomenScorer],
		},
	],
})
export class PatientModule {}
