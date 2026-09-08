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
import { UrinaryScorer } from "./scoring/scorers/urinary.scorer";
import { GynecologicalScorer } from "./scoring/scorers/gynecological.scorer";
import { DermatologicalScorer } from "./scoring/scorers/dermatological.scorer";
import { EntScorer } from "./scoring/scorers/ent.scorer";
import { PsychologicalScorer } from "./scoring/scorers/psychological.scorer";
import { IntoxicationScorer } from "./scoring/scorers/intoxication.scorer";
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
		UrinaryScorer,
		GynecologicalScorer,
		DermatologicalScorer,
		EntScorer,
		PsychologicalScorer,
		IntoxicationScorer,
		{
			provide: SYMPTOM_SCORERS,
			useFactory: (
				trauma: TraumaScorer,
				abdomen: AbdomenScorer,
				cardiac: CardiacScorer,
				respiratory: RespiratoryScorer,
				infection: InfectionScorer,
				neurological: NeurologicalScorer,
				urinary: UrinaryScorer,
				gynecological: GynecologicalScorer,
				dermatological: DermatologicalScorer,
				ent: EntScorer,
				psychological: PsychologicalScorer,
				intoxication: IntoxicationScorer,
			) => [
				trauma,
				abdomen,
				cardiac,
				respiratory,
				infection,
				neurological,
				urinary,
				gynecological,
				dermatological,
				ent,
				psychological,
				intoxication,
			],
			inject: [
				TraumaScorer,
				AbdomenScorer,
				CardiacScorer,
				RespiratoryScorer,
				InfectionScorer,
				NeurologicalScorer,
				UrinaryScorer,
				GynecologicalScorer,
				DermatologicalScorer,
				EntScorer,
				PsychologicalScorer,
				IntoxicationScorer,
			],
		},
	],
})
export class PatientModule {}
