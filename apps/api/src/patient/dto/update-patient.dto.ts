import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";
import { patientStatuses, PatientStatus } from "./patient-list.dto";

export class UpdatePatientDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(5)
	french?: number;

	@IsOptional()
	@IsIn(patientStatuses)
	status?: PatientStatus;
}
