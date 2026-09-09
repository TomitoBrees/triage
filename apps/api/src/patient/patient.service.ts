import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { FrenchScoreService } from "./scoring/french-score.service";

@Injectable()
export class PatientService {
	constructor(
		private readonly prisma: PrismaService,
		private frenchScoreService: FrenchScoreService,
	) {}

	create(dto: CreatePatientDto) {
		const symptom = dto.criticalSymptom ?? dto.moderateSymptom ?? dto.generalSymptom;
		const french = this.frenchScoreService.computeFrench(dto);

		return this.prisma.patient.create({
			data: {
				firstName: dto.personalInformation.firstName,
				lastName: dto.personalInformation.lastName,
				age: dto.personalInformation.age,
				french,
				symptom: symptom ?? null,
				symptomDescription: dto.symptomDescription ?? null,
			},
		});
	}
}
