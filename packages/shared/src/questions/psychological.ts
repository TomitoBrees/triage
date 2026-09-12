import type { PatientQuestion } from "../patient-questions";

export const psychologicalQuestions: PatientQuestion[] = [
	{
		id: "psychologicalProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "suicidalThoughts",
				label: "J'ai des idées noires, je pense à me faire du mal ou à mourir",
			},
			{
				id: "behaviorTrouble",
				label: "Je ne me sens plus moi-même : agitation, colère, ou des choses étranges que je vois ou j'entends",
			},
			{
				id: "anxietyOrDepression",
				label: "Je suis très angoissé ou déprimé, ou je viens pour un suivi psychiatrique",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les troubles du comportement
	{
		id: "behaviorTroubleSigns",
		text: "En ce moment, vous arrive-t-il l'un de ces états ?",
		type: "single-choice",
		conditions: [{ questionId: "psychologicalProblem", answer: "behaviorTrouble" }],
		options: [
			{ id: "agitation", label: "Je n'arrive pas à me calmer, je ne tiens pas en place" },
			{
				id: "violence",
				label: "Je me suis emporté : j'ai cassé quelque chose, ou j'ai frappé",
			},
			{
				id: "hallucinations",
				label: "J'entends ou je vois des choses que les autres ne perçoivent pas",
			},
			{
				id: "delusion",
				label: "Je me sens menacé ou persécuté, ou mon entourage trouve mes idées étranges",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces états" },
			{ id: "none", label: "Aucun de ces états" },
		],
	},

	// Question spécifique pour l'anxiété et la dépression
	{
		id: "anxietySeverity",
		text: "Ce que vous ressentez, c'est plutôt :",
		type: "single-choice",
		conditions: [{ questionId: "psychologicalProblem", answer: "anxietyOrDepression" }],
		options: [
			{
				id: "panicAttack",
				label: "Une crise d'angoisse en ce moment même : cœur qui s'emballe, souffle court, sensation de perdre pied",
			},
			{
				id: "majorAnxiety",
				label: "Une angoisse permanente, que je n'arrive plus du tout à contrôler",
			},
			{
				id: "depression",
				label: "De la tristesse, de la fatigue, un moral très bas",
			},
			{
				id: "followUp",
				label: "Je viens pour un suivi, un renouvellement de traitement, ou un avis",
			},
		],
	},
];
