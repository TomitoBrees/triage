import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";

@Injectable()
export class PatientService {
	constructor(private readonly prisma: PrismaService) {}

	create(dto: CreatePatientDto) {
		const symptom = dto.criticalSymptom ?? dto.moderateSymptom ?? dto.generalSymptom;
		const french = this.computeFrench(dto);

		return this.prisma.patient.create({
			data: {
				firstName: dto.personalInformation.firstName,
				lastName: dto.personalInformation.lastName,
				age: dto.personalInformation.age,
				french,
				symptom: symptom ?? null,
			},
		});
	}

	private computeFrench(dto: CreatePatientDto): number {
		if (dto.criticalSymptom) return 1;
		if (dto.moderateSymptom) return 2;

		// TODO: déléguer à un scorer par generalSymptom à partir de
		// dto.generalSymptom / dto.sharedAnswers / dto.specificAnswers.
		return 5;
	}
}
