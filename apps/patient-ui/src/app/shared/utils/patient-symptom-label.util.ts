import type { PatientSymptomId } from "../../features/patient-questionnaire/types/patient-questionnaire.types";

export const patientSymptomFrenchLabels: Record<PatientSymptomId, string> = {
	chestPain: "Douleur ou oppression dans la poitrine",
	breathingDifficulty: "Difficulté importante à respirer",
	suddenSpeechDifficulty: "Difficulté soudaine à parler ou à comprendre",
	facialDrooping: "Visage affaissé d'un côté",
	severeBleeding: "Saignement important",
	swellingFaceLipsThroat: "Gonflement du visage, des lèvres ou de la gorge",
	weaknessArmLeg: "Faiblesse dans un bras ou une jambe",
	headInjury: "Blessure à la tête",
	sucidalIdeation: "Idées suicidaires ou envie de se faire du mal",
	abdominalPainPregnant: "Douleur au ventre pendant la grossesse",
};

export function patientSymptomToFrench(symptom: PatientSymptomId | null | undefined): string {
	return symptom ? patientSymptomFrenchLabels[symptom] : "Aucun symptôme signalé";
}
