import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { FrenchScoreService } from "./scoring/french-score.service";
import { TraumaScorer } from "./scoring/scorers/trauma.scorer";
import { AbdomenScorer } from "./scoring/scorers/abdomen.scorer";
import { CardiacScorer } from "./scoring/scorers/cardiac.scorer";
import { RespiratoryScorer } from "./scoring/scorers/respiratory.scorer";
import { SYMPTOM_SCORERS } from "./scoring/symptom-scorers.token";

@Module({
	controllers: [PatientController],
	providers: [
		PatientService,
		FrenchScoreService,
		TraumaScorer,
		AbdomenScorer,
		CardiacScorer,
		RespiratoryScorer,
		{
			provide: SYMPTOM_SCORERS,
			useFactory: (
				trauma: TraumaScorer,
				abdomen: AbdomenScorer,
				cardiac: CardiacScorer,
				respiratory: RespiratoryScorer,
			) => [trauma, abdomen, cardiac, respiratory],
			inject: [TraumaScorer, AbdomenScorer, CardiacScorer, RespiratoryScorer],
		},
	],
})
export class PatientModule {}
