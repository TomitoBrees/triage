import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { FrenchScoreService } from "./scoring/french-score.service";
import { TraumaScorer } from "./scoring/scorers/trauma.scorer";
import { AbdomenScorer } from "./scoring/scorers/abdomen.scorer";
import { CardiacScorer } from "./scoring/scorers/cardiac.scorer";
import { SYMPTOM_SCORERS } from "./scoring/symptom-scorers.token";

@Module({
	controllers: [PatientController],
	providers: [
		PatientService,
		FrenchScoreService,
		TraumaScorer,
		AbdomenScorer,
		CardiacScorer,
		{
			provide: SYMPTOM_SCORERS,
			useFactory: (trauma: TraumaScorer, abdomen: AbdomenScorer, cardiac: CardiacScorer) => [
				trauma,
				abdomen,
				cardiac,
			],
			inject: [TraumaScorer, AbdomenScorer, CardiacScorer],
		},
	],
})
export class PatientModule {}
