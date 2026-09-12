import type { PatientQuestion } from "../patient-questions";

export const cardiacQuestions: PatientQuestion[] = [
	{
		id: "cardiacProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{ id: "chestPain", label: "Douleur, serrement ou gêne dans la poitrine" },
			{
				id: "coldPaleLimb",
				label: "Un bras ou une jambe est douloureux, froid, pâle ou bleu",
			},
			{ id: "faintness", label: "Malaise ou perte de connaissance" },
			{
				id: "palpitations",
				label: "Mon cœur bat vite, fort, lentement ou de façon irrégulière",
			},
			{ id: "breathlessness", label: "Je suis essoufflé de façon inhabituelle" },
			{ id: "deviceProblem", label: "Problème avec mon pacemaker ou mon défibrillateur" },
			{ id: "legSwelling", label: "Mes jambes ou mes chevilles sont gonflées" },
			{ id: "hotRedLimb", label: "Une jambe est douloureuse, chaude, rouge ou gonflée" },
			{ id: "highBloodPressure", label: "Ma tension est trop élevée" },
			{ id: "lowBloodPressure", label: "Ma tension est trop basse" },
			{ id: "other", label: "Autre" },
		],
	},

	// Questions spécifiques pour les douleurs dans la poitrine
	{
		id: "chestPainType",
		text: "Comment décririez-vous cette douleur ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "chestPain" }],
		options: [
			{ id: "tightness", label: "Un serrement, un poids ou un étau sur la poitrine" },
			{ id: "radiating", label: "Une douleur qui part vers le bras, la mâchoire ou le dos" },
			{ id: "burning", label: "Une brûlure, comme une remontée acide" },
			{ id: "sharp", label: "Une douleur qui pique, comme un coup de pointe" },
			{
				id: "positional",
				label: "Une douleur qui change quand je respire ou quand je bouge",
			},
			{ id: "idk", label: "Je n'arrive pas à décrire" },
		],
	},
	{
		id: "heartHistory",
		text: "Avez-vous déjà eu un problème de cœur, ou l'un de ces antécédents ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: ["chestPain", "other"] }],
		options: [
			{
				id: "knownHeartDisease",
				label: "Oui, j'ai déjà fait un infarctus ou j'ai un stent, un pontage",
			},
			{
				id: "riskFactors",
				label: "J'ai du diabète, du cholestérol, de la tension, ou je fume",
			},
			{ id: "none", label: "Non, aucun" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour les troubles du rythme et les palpitations
	{
		id: "heartRate",
		text: "Si vous avez pu mesurer votre pouls (tensiomètre, montre connectée), il était de :",
		type: "single-choice",
		conditions: [
			{ questionId: "cardiacProblem", answer: ["palpitations", "lowBloodPressure"] },
		],
		options: [
			{ id: "veryFast", label: "Très rapide : plus de 180 battements par minute" },
			{ id: "fast", label: "Rapide : entre 130 et 180" },
			{ id: "slightlyFast", label: "Un peu rapide : entre 110 et 130" },
			{ id: "normal", label: "Normal : entre 50 et 110" },
			{ id: "slow", label: "Lent : entre 40 et 50" },
			{ id: "verySlow", label: "Très lent : moins de 40" },
			{ id: "unknown", label: "Je n'ai pas pu le mesurer" },
		],
	},
	{
		id: "cardiacFainting",
		text: "Avez vous fait un malaise ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "palpitations" }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour l'essoufflement
	{
		id: "breathlessnessSeverity",
		text: "Dans votre essoufflement :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: ["breathlessness"] }],
		options: [
			{
				id: "whenSpeaking",
				label: "Je n'arrive pas à finir mes phrases sans reprendre mon souffle",
			},
			{
				id: "whenLyingDown",
				label: "Je n'arrive pas a respirer alongé (dans mon sommeil par exemple)",
			},
			{ id: "atRest", label: "Je suis essoufflé même sans rien faire" },
			{ id: "multiple", label: "Plusieurs de ces propositions" },
			{ id: "none", label: "Aucun de ces exemples" },
		],
	},

	// Questions spécifiques pour un membre froid, pâle ou bleu
	{
		id: "limbIschemiaSigns",
		text: "Au niveau de ce bras ou de cette jambe, avez-vous :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "coldPaleLimb" }],
		options: [
			{ id: "blueOrPurple", label: "La peau bleue ou violette" },
			{ id: "unableToMove", label: "Je n'arrive plus à le bouger normalement" },
			{ id: "noSensation", label: "Je n'ai plus de sensations, c'est engourdi" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Questions spécifiques pour la tension artérielle
	{
		id: "highBloodPressureValue",
		text: "Si vous avez mesuré votre tension, le premier chiffre (le plus grand) était :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "highBloodPressure" }],
		options: [
			{ id: "above220", label: "22 ou plus (220)" },
			{ id: "above180", label: "Entre 18 et 22 (180 à 220)" },
			{ id: "below180", label: "Moins de 18 (180)" },
			{ id: "unknown", label: "Je ne l'ai pas mesurée" },
		],
	},
	{
		id: "highBloodPressureSigns",
		text: "Avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "highBloodPressure" }],
		options: [
			{ id: "headache", label: "Un mal de tête important" },
			{ id: "visionProblem", label: "Des troubles de la vue" },
			{ id: "nosebleed", label: "Un saignement de nez" },
			{ id: "chestPain", label: "Une douleur dans la poitrine ou du mal à respirer" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "lowBloodPressureValue",
		text: "Si vous avez mesuré votre tension, le premier chiffre (le plus grand) était :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "lowBloodPressure" }],
		options: [
			{ id: "below70", label: "Moins de 7 (70)" },
			{ id: "below90", label: "Entre 7 et 9 (70 à 90)" },
			{ id: "below100", label: "Entre 9 et 10 (90 à 100)" },
			{ id: "above100", label: "Plus de 10 (100)" },
			{ id: "unknown", label: "Je ne l'ai pas mesurée" },
		],
	},

	// Question spécifique pour les pacemakers et défibrillateurs
	{
		id: "deviceShocks",
		text: "Votre appareil vous a-t-il envoyé un ou plusieurs chocs électriques ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "deviceProblem" }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
