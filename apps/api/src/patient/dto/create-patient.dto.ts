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

export const moderateSymptoms = ["headInjury", "sucidalIdeation", "abdominalPainPregnant"] as const;

export const generalSymptoms = [
	"traumatological",
	"abdominal",
	"cardiac",
	"respiratory",
	"infection",
	"neurological",
	"urinary",
	"gynecological",
	"dermatological",
	"ent",
	"psychological",
	"intoxication",
	"generalWeakness",
] as const;

export const patientSymptoms = [
	...criticalSymptoms,
	...moderateSymptoms,
	...generalSymptoms,
] as const;

export type PatientSymptom = (typeof patientSymptoms)[number];

export type CriticalSymptom = (typeof criticalSymptoms)[number];
export type ModerateSymptom = (typeof moderateSymptoms)[number];
export type GeneralSymptom = (typeof generalSymptoms)[number];

export type PatientAnswerValue = string | number | boolean;

export class PersonalInformationDto {
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

	@IsOptional()
	@IsIn(generalSymptoms)
	generalSymptom?: GeneralSymptom;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PersonalInformationDto)
	personalInformation!: PersonalInformationDto;

	@IsOptional()
	@IsObject()
	sharedAnswers?: Record<string, PatientAnswerValue>;

	@IsOptional()
	@IsObject()
	specificAnswers?: Record<string, PatientAnswerValue>;

	@IsOptional()
	@IsString()
	symptomDescription?: string;
}
