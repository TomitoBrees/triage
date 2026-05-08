import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";

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
				symptom: symptom ?? null,
			},
		});
	}
}
