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
	"chestPain",
	"breathingDifficulty",
	"suddenSpeechDifficulty",
	"facialDrooping",
	"severeBleeding",
	"swellingFaceLipsThroat",
	"weaknessArmLeg",
] as const;

export const moderateSymptoms = [
	"fainting",
	"weaknessArmLeg",
	"confusion",
	"headInjury",
	"sucidalIdeation",
	"abdominalPainPregnant",
] as const;

export const patientSymptoms = [...criticalSymptoms, ...moderateSymptoms] as const;

export type PatientSymptom = (typeof patientSymptoms)[number];

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
	criticalSymptom?: PatientSymptom;

	@IsOptional()
	@IsIn(moderateSymptoms)
	moderateSymptom?: PatientSymptom;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PersonalInformationDto)
	personalInformation!: PersonalInformationDto;
}
