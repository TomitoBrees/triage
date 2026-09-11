import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { FrenchScoreService } from "./scoring/french-score.service";
import { PatientList } from "./dto/patient-list.dto";
import { PatientDetail } from "./dto/patient-detail.dto";
import { toPatientList } from "./patient-list.util";
import { toPatientDetail } from "./patient-detail.util";
import { Prisma } from "../../generated/prisma/client";

@Injectable()
export class PatientService {
	constructor(
		private readonly prisma: PrismaService,
		private frenchScoreService: FrenchScoreService,
	) {}

	create(dto: CreatePatientDto) {
		const symptom = dto.criticalSymptom ?? dto.generalSymptom;
		const french = this.frenchScoreService.computeFrench(dto);

		return this.prisma.patient.create({
			data: {
				firstName: dto.personalInformation.firstName,
				lastName: dto.personalInformation.lastName,
				age: dto.personalInformation.age,
				isMale: dto.personalInformation.isMale,
				french,
				symptom: symptom ?? null,
				symptomDescription: dto.symptomDescription ?? null,
				sharedAnswers: dto.sharedAnswers ?? Prisma.JsonNull,
				specificAnswers: dto.specificAnswers ?? Prisma.JsonNull,
			},
		});
	}

	async getPatientList(): Promise<PatientList> {
		const patients = await this.prisma.patient.findMany();

		return toPatientList(patients);
	}

	async getPatientById(id: string): Promise<PatientDetail> {
		const patient = await this.prisma.patient.findUnique({ where: { id } });

		if (!patient) {
			throw new NotFoundException(`Patient ${id} not found`);
		}

		return toPatientDetail(patient);
	}
}
