import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { PatientService } from "./patient.service";
import { PatientList } from "./dto/patient-list.dto";
import { PatientDetail } from "./dto/patient-detail.dto";

@Controller("patient")
export class PatientController {
	constructor(private readonly patientService: PatientService) {}

	@Post()
	create(@Body() dto: CreatePatientDto) {
		return this.patientService.create(dto);
	}

	@Get()
	getPatientList(): Promise<PatientList> {
		return this.patientService.getPatientList();
	}

	@Get(":id")
	getPatientById(@Param("id") id: string): Promise<PatientDetail> {
		return this.patientService.getPatientById(id);
	}

	@Patch(":id")
	updatePatient(
		@Param("id") id: string,
		@Body() dto: UpdatePatientDto,
	): Promise<PatientDetail> {
		return this.patientService.updatePatient(id, dto);
	}
}
