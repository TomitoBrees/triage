import { Type } from "class-transformer";
import {
	IsBoolean,
	IsIn,
	IsInt,
	IsNotEmptyObject,
	IsObject,
	IsOptional,
	IsString,
	Max,
	Min,
	ValidateNested,
} from "class-validator";

export const criticalSymptoms = [
	"chest-pain",
	"breathing-difficulty",
	"sudden-speech-difficulty",
	"facial-drooping",
	"severe-bleeding",
	"swelling-face-lips-throat",
] as const;

export const moderateSymptoms = [
	"fainting",
	"weakness-arm-leg",
	"confusion",
	"head-injury",
	"sucidal-ideation",
	"abdominal-pain-pregnant",
] as const;

export type CriticalSymptom = (typeof criticalSymptoms)[number];
export type ModerateSymptom = (typeof moderateSymptoms)[number];
export type PatientSymptom = CriticalSymptom | ModerateSymptom;

class PersonalInformationDto {
	@IsString()
	firstName!: string;

	@IsString()
	lastName!: string;

	@IsInt()
	@Min(0)
	@Max(130)
	age!: number;

	@IsBoolean()
	isMale!: boolean;
}

export class CreatePatientDto {
	@IsOptional()
	@IsIn(criticalSymptoms)
	criticalSymptom?: CriticalSymptom;

	@IsOptional()
	@IsIn(moderateSymptoms)
	moderateSymptom?: ModerateSymptom;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PersonalInformationDto)
	personalInformation!: PersonalInformationDto;
}
