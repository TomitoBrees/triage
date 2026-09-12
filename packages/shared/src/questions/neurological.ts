import type { PatientQuestion } from "../patient-questions";

export const neurologicalQuestions: PatientQuestion[] = [
	{
		id: "neurologicalProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "alteredConsciousness",
				label: "Je n'arrive pas à rester bien réveillé, ou la personne pour qui je remplis ce formulaire est difficile à réveiller",
			},
			{
				id: "deficit",
				label: "Je n'arrive plus à bouger ou à sentir un bras ou une jambe, ou j'ai du mal à parler ou à voir",
			},
			{ id: "seizure", label: "J'ai fait une crise d'épilepsie ou des convulsions" },
			{
				id: "confusion",
				label: "Je suis confus, désorienté, je ne sais plus où je suis ou bien quel jour on est",
			},
			{ id: "headache", label: "J'ai mal à la tête" },
			{ id: "vertigo", label: "J'ai des vertiges ou je perds l'équilibre" },
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les convulsions
	{
		id: "seizureContext",
		text: "Depuis cette crise, où en êtes-vous ?",
		type: "single-choice",
		conditions: [{ questionId: "neurologicalProblem", answer: "seizure" }],
		options: [
			{
				id: "multipleOrOngoing",
				label: "J'ai fait plusieurs crises, ou la crise n'est pas terminée",
			},
			{ id: "postictalConfusion", label: "Je n'ai pas repris mes esprits, je suis confus" },
			{ id: "headTrauma", label: "Je me suis cogné la tête pendant la crise" },
			{
				id: "deficit",
				label: "Il me reste une faiblesse, un engourdissement ou du mal à parler",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces situations" },
			{ id: "fullRecovery", label: "J'ai complètement récupéré, je me sens comme avant" },
		],
	},

	// Question commune aux convulsions, à la confusion et aux céphalées
	{
		id: "neurologicalFever",
		text: "Avez-vous de la fièvre ?",
		type: "single-choice",
		conditions: [
			{ questionId: "neurologicalProblem", answer: ["seizure", "confusion", "headache"] },
		],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les céphalées
	{
		id: "headacheType",
		text: "Ce mal de tête, comment est-il par rapport à d'habitude ?",
		type: "single-choice",
		conditions: [{ questionId: "neurologicalProblem", answer: "headache" }],
		options: [
			{
				id: "firstEpisode",
				label: "C'est la première fois que j'ai un mal de tête comme celui-là",
			},
			{
				id: "unusual",
				label: "J'ai déjà des maux de tête, mais celui-ci est différent ou bien plus fort",
			},
			{ id: "usualMigraine", label: "C'est mon mal de tête habituel, ma migraine" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les vertiges
	{
		id: "vertigoAssociatedSigns",
		text: "Avec ces vertiges, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "neurologicalProblem", answer: "vertigo" }],
		options: [
			{ id: "speechOrVision", label: "Du mal à parler, ou je vois double" },
			{
				id: "weaknessOrNumbness",
				label: "Une faiblesse ou un engourdissement d'un bras ou d'une jambe",
			},
			{
				id: "suddenHeadache",
				label: "Un mal de tête violent, arrivé d'un coup",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
];
