import type { PatientQuestion } from "./patient-questions";
import type { PatientSymptom } from "./patient-symptom";
import { abdominalQuestions } from "./questions/abdominal";
import { cardiacQuestions } from "./questions/cardiac";
import { dermatologicalQuestions } from "./questions/dermatological";
import { entQuestions } from "./questions/ent";
import { gynecologicalQuestions } from "./questions/gynecological";
import { infectionQuestions } from "./questions/infection";
import { intoxicationQuestions } from "./questions/intoxication";
import { neurologicalQuestions } from "./questions/neurological";
import { psychologicalQuestions } from "./questions/psychological";
import { respiratoryQuestions } from "./questions/respiratory";
import { traumaQuestions } from "./questions/trauma";
import { urinaryQuestions } from "./questions/urinary";

/**
 * Les symptômes critiques n'ont pas de questionnaire spécifique : le parcours passe
 * directement à la description libre.
 */
export const specificQuestionsBySymptom: Partial<Record<PatientSymptom, PatientQuestion[]>> = {
	traumatological: traumaQuestions,
	abdominal: abdominalQuestions,
	cardiac: cardiacQuestions,
	respiratory: respiratoryQuestions,
	infection: infectionQuestions,
	neurological: neurologicalQuestions,
	urinary: urinaryQuestions,
	gynecological: gynecologicalQuestions,
	dermatological: dermatologicalQuestions,
	ent: entQuestions,
	psychological: psychologicalQuestions,
	intoxication: intoxicationQuestions,
};

export function specificQuestionsFor(
	symptom: PatientSymptom | null | undefined,
): PatientQuestion[] {
	if (!symptom) return [];

	return specificQuestionsBySymptom[symptom] ?? [];
}
