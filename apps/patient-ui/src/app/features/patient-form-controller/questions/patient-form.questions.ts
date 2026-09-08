import type { PatientQuestion, SymptomQuestion } from "../types/patient-form.types";

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
		symptomText: "Fièvre, frissons, infection possible",
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

export const sharedQuestions: PatientQuestion[] = [
	{
		id: "startTime",
		text: "Depuis quand ce problème a-t-il commencé ?",
		type: "single-choice",
		options: [
			{ id: "lessThanAnHour", label: "Moins d'une heure" },
			{ id: "oneToSixHours", label: "1 à 6 heures" },
			{ id: "today", label: "Aujourd'hui" },
			{ id: "yesterday", label: "Hier" },
			{ id: "twoToSevenDays", label: "2 à 7 jours" },
			{ id: "moreThanAWeek", label: "Plus d'une semaine" },
		],
	},
	{
		id: "startMotive",
		text: "Comment cela a-t-il commencé ?",
		type: "single-choice",
		options: [
			{ id: "brutally", label: "Brutalement, d'un coup" },
			{ id: "progressively", label: "Progressivement" },
		],
	},
	{
		id: "stillHere",
		text: "Le problème est-il présent maintenant ?",
		type: "single-choice",
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non, c'est passé" },
			{ id: "depends", label: "Ca revient par moments" },
		],
	},
	{
		id: "painScale",
		text: "À quel point cela vous gêne, vous fait mal ou vous inquiète ?",
		type: "number",
		min: 0,
		max: 10,
		step: 1,
		minLabel: "Pas du tout",
		maxLabel: "Extrêmement",
	},
	{
		id: "evolution",
		text: "Depuis le début, est-ce que ça ?",
		type: "single-choice",
		options: [
			{ id: "aggravating", label: "S'aggrave" },
			{ id: "stable", label: "Reste pareil" },
			{ id: "better", label: "S'améliore" },
			{ id: "fluctuating", label: "Fluctue entre mieux et pire par moments" },
		],
	},
	{
		id: "visitMotive",
		text: "Pourquoi venez-vous aux urgences maintenant ?",
		type: "single-choice",
		options: [
			{ id: "importantSymptoms", label: "La douleur ou les symptômes sont trop importants" },
			{ id: "aggravating", label: "Cela s'aggrave" },
			{ id: "doctorReferral", label: "Mon médecin m'a envoyé ici" },
			{ id: "noAlternative", label: "Je n'ai pas trouvé de rendez-vous ailleurs" },
			{ id: "afraid", label: "Je suis inquiet/inquiète" },
			{ id: "other", label: "Autre raison" },
		],
	},
];
