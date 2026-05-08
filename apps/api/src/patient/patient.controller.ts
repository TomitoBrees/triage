import { Body, Controller, Post } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { PatientService } from "./patient.service";

@Controller("patient")
export class PatientController {
	constructor(private readonly patientService: PatientService) {}

	@Post()
	create(@Body() dto: CreatePatientDto) {
		return this.patientService.create(dto);
	}
}
