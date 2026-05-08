import { Injectable } from "@nestjs/common";
import { PatientSymptom as DbPatientSymptom } from "../../generated/prisma/enums";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePatientDto, PatientSymptom } from "./dto/create-patient.dto";

const patientSymptoms: Record<PatientSymptom, DbPatientSymptom> = {
	"chest-pain": DbPatientSymptom.chestPain,
	"breathing-difficulty": DbPatientSymptom.breathingDifficulty,
	"sudden-speech-difficulty": DbPatientSymptom.suddenSpeechDifficulty,
	"facial-drooping": DbPatientSymptom.facialDrooping,
	"severe-bleeding": DbPatientSymptom.severeBleeding,
	"swelling-face-lips-throat": DbPatientSymptom.swellingFaceLipsThroat,
	fainting: DbPatientSymptom.fainting,
	"weakness-arm-leg": DbPatientSymptom.weaknessArmLeg,
	confusion: DbPatientSymptom.confusion,
	"head-injury": DbPatientSymptom.headInjury,
	"sucidal-ideation": DbPatientSymptom.sucidalIdeation,
	"abdominal-pain-pregnant": DbPatientSymptom.abdominalPainPregnant,
};

@Injectable()
export class PatientService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: CreatePatientDto) {
		const symptom = dto.criticalSymptom ?? dto.moderateSymptom;
		const french = dto.criticalSymptom ? 1 : dto.moderateSymptom ? 2 : 5;

		return this.prisma.patient.create({
			data: {
				firstName: dto.personalInformation.firstName,
				lastName: dto.personalInformation.lastName,
				age: dto.personalInformation.age,
				french,
				symptom: symptom ? patientSymptoms[symptom] : null,
			},
		});
	}
}
