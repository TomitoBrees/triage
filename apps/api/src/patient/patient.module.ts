import { Module } from "@nestjs/common";
import { PatientController } from "./patient.controller";
import { PatientService } from "./patient.service";
import { FrenchScoreService } from "./scoring/french-score.service";
import { TraumaScorer } from "./scoring/scorers/trauma.scorer";
import { AbdomenScorer } from "./scoring/scorers/abdomen.scorer";
import { CardiacScorer } from "./scoring/scorers/cardiac.scorer";
import { RespiratoryScorer } from "./scoring/scorers/respiratory.scorer";
import { InfectionScorer } from "./scoring/scorers/infection.scorer";
import { NeurologicalScorer } from "./scoring/scorers/neurological.scorer";
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
		InfectionScorer,
		NeurologicalScorer,
		{
			provide: SYMPTOM_SCORERS,
			useFactory: (
				trauma: TraumaScorer,
				abdomen: AbdomenScorer,
				cardiac: CardiacScorer,
				respiratory: RespiratoryScorer,
				infection: InfectionScorer,
				neurological: NeurologicalScorer,
			) => [trauma, abdomen, cardiac, respiratory, infection, neurological],
			inject: [
				TraumaScorer,
				AbdomenScorer,
				CardiacScorer,
				RespiratoryScorer,
				InfectionScorer,
				NeurologicalScorer,
			],
		},
	],
})
export class PatientModule {}
