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

const criticalSymptoms = [
	"chest-pain",
	"breathing-difficulty",
	"sudden-speech-difficulty",
	"facial-drooping",
	"severe-bleeding",
	"swelling-face-lips-throat",
] as const;

const moderateSymptoms = [
	"fainting",
	"weakness-arm-leg",
	"confusion",
	"head-injury",
	"sucidal-ideation",
	"abdominal-pain-pregnant",
] as const;

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

export class CreatePatientQuestionnaireDto {
	@IsOptional()
	@IsIn(criticalSymptoms)
	criticalSymptom?: (typeof criticalSymptoms)[number];

	@IsOptional()
	@IsIn(moderateSymptoms)
	moderateSymptom?: (typeof moderateSymptoms)[number];

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PersonalInformationDto)
	personalInformation!: PersonalInformationDto;
}
