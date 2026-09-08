import { PersonalInformationDto } from "../dto/create-patient.dto";

export const CHILD_MAX_AGE = 15;

export function isChild(personalInformation: PersonalInformationDto): boolean {
	return personalInformation.age <= CHILD_MAX_AGE;
}
