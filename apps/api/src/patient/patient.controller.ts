import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientService } from "./patient.service";
import { PatientList } from "./dto/patient-list.dto";

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
}
