import type { PatientSymptom } from "./patient-symptom";

export const patientSymptomFrenchLabels: Record<PatientSymptom, string> = {
	chestPain: "Douleur ou oppression dans la poitrine",
	breathingDifficulty: "Difficulté importante à respirer",
	suddenSpeechDifficulty: "Difficulté soudaine à parler ou à comprendre",
	facialDrooping: "Visage affaissé d'un côté",
	severeBleeding: "Saignement important",
	swellingFaceLipsThroat: "Gonflement du visage, des lèvres ou de la gorge",
	weaknessArmLeg: "Faiblesse dans un bras ou une jambe",
	traumatological: "Traumatisme, blessure",
	abdominal: "Douleur ou problème digestif",
	cardiac: "Problème de cœur ou palpitations",
	respiratory: "Problème respiratoire, toux ou gorge irritée",
	infection: "Fièvre, frissons ou infection",
	neurological:
		"Symptôme neurologique comme maux de tête sévères, convulsions, perte de conscience",
	urinary: "Problème urinaire ou douleur à la miction",
	gynecological: "Symptôme gynécologique comme saignement vaginal anormal ou douleur pelvienne",
	dermatological: "Problème dermatologique comme éruption cutanée sévère ou brûlure étendue",
	ent: "Problème ORL comme mal de gorge sévère, otite ou vertiges",
	psychological: "Symptôme psychologique comme anxiété sévère, dépression ou crise de panique",
	intoxication: "Symptôme d'intoxication comme confusion, vomissements ou difficulté à respirer",
	generalWeakness: "Faiblesse générale sévère ou malaise",
};

export function patientSymptomToFrench(symptom: PatientSymptom | null | undefined): string {
	if (!symptom) return "Aucun symptôme signalé";

	// La base peut encore contenir des identifiants retirés de l'union (anciennes
	// lignes, valeurs orphelines de l'enum Prisma) : ne jamais rendre "undefined".
	return patientSymptomFrenchLabels[symptom] ?? "Symptôme non reconnu";
}
