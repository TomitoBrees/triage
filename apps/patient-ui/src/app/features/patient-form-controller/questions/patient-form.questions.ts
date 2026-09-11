import type { SymptomQuestion } from "../types/patient-form.types";

export const criticalSymptoms: SymptomQuestion[] = [
	{
		symptomText: "Douleur, pression ou serrement dans la poitrine",
		symptomEmoji: "🫀",
		symptomId: "chestPain",
	},
	{
		symptomText: "Difficulté à respirer ou essoufflement important au repos",
		symptomEmoji: "🫁",
		symptomId: "breathingDifficulty",
	},
	{
		symptomText: "Difficulté soudaine à parler ou à comprendre",
		symptomEmoji: "🧠",
		symptomId: "suddenSpeechDifficulty",
	},
	{
		symptomText: "Bouche ou visage qui s'affaisse d'un côté",
		symptomEmoji: "🧠",
		symptomId: "facialDrooping",
	},
	{
		symptomText: "Faiblesse soudaine d'un bras ou d'une jambe",
		symptomEmoji: "🧠",
		symptomId: "weaknessArmLeg",
	},
	{
		symptomText: "Saignement important qui ne s'arrête pas",
		symptomEmoji: "🩸",
		symptomId: "severeBleeding",
	},
	{
		symptomText:
			"Gonflement du visage, des lèvres ou de la gorge après avoir mangé ou pris un médicament",
		symptomEmoji: "💊",
		symptomId: "swellingFaceLipsThroat",
	},
];

export const generalSymptoms: SymptomQuestion[] = [
	{
		symptomText: "Blessure, chute, coup, accident, brûlure, éléctrocution",
		symptomEmoji: "🤕",
		symptomId: "traumatological",
	},
	{
		symptomText: "Douleur au ventre, vomissements, diarrhée, problème digestif",
		symptomEmoji: "🤢",
		symptomId: "abdominal",
	},
	{
		symptomText: "Douleur à la poitrine, palpitations, problème de cœur",
		symptomEmoji: "💗",
		symptomId: "cardiac",
	},
	{
		symptomText: "Difficulté à respirer, toux, gorge, problème respiratoire",
		symptomEmoji: "🫁",
		symptomId: "respiratory",
	},
	{
		symptomText:
			"Fièvre, frissons, infection possible, contact avec un liquide biologique étranger",
		symptomEmoji: "🌡️",
		symptomId: "infection",
	},
	{
		symptomText: "Mal de tête, vertiges, malaise, faiblesse, convulsion, confusion",
		symptomEmoji: "🧠",
		symptomId: "neurological",
	},
	{
		symptomText: "Douleur en urinant, problème urinaire, reins ou parties intimes",
		symptomEmoji: "🚽",
		symptomId: "urinary",
	},
	{
		symptomText: "Grossesse, douleur pelvienne, saignement vaginal, problème gynécologique",
		symptomEmoji: "🤰",
		symptomId: "gynecological",
	},
	{
		symptomText: "Problème de peau, rougeur, bouton, gonflement, allergie, piqûre",
		symptomEmoji: "✋",
		symptomId: "dermatological",
	},
	{
		symptomText: "Problème à l'œil, l'oreille, le nez, la bouche ou les dents",
		symptomEmoji: "👁️",
		symptomId: "ent",
	},
	{
		symptomText: "Angoisse, idées noires, tentative de se faire du mal, crise psychologique",
		symptomEmoji: "💭",
		symptomId: "psychological",
	},
	{
		symptomText: "Médicament, alcool, drogue, intoxication, produit avalé ou inhalé",
		symptomEmoji: "💊",
		symptomId: "intoxication",
	},
	{
		symptomText: "Grande fatigue, faiblesse générale",
		symptomEmoji: "😴",
		symptomId: "generalWeakness",
	},
];
