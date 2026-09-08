import type { PatientQuestion } from "../types/patient-form.types";

export const urinaryQuestions: PatientQuestion[] = [
	{
		id: "urinaryProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "flankPain",
				label: "J'ai mal dans le bas du dos ou sur le côté",
			},
			{ id: "urinaryRetention", label: "Je n'arrive plus du tout à uriner" },
			{ id: "scrotalPain", label: "J'ai mal aux testicules ou aux bourses" },
			{
				id: "catheterProblem",
				label: "J'ai un problème avec ma sonde urinaire, ma sonde JJ ou ma stomie",
			},
			{ id: "hematuria", label: "Il y a du sang dans mes urines" },
			{
				id: "dysuria",
				label: "Ça me brûle quand j'urine, ou je pense avoir une infection urinaire",
			},
			{
				id: "genitalLesion",
				label: "J'ai un écoulement, un bouton ou une plaie sur les parties génitales",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les douleurs de bourse
	{
		id: "scrotalPainSigns",
		text: "Au niveau de la bourse douloureuse, constatez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "urinaryProblem", answer: "scrotalPain" }],
		options: [
			{
				id: "highRidingTestis",
				label: "Le testicule est remonté, plus haut ou de travers par rapport à l'autre",
			},
			{
				id: "swollenHardScrotum",
				label: "La bourse est gonflée, dure, et je ne supporte pas qu'on la touche",
			},
			{ id: "nausea", label: "La douleur me donne des nausées ou m'a fait vomir" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour le sang dans les urines
	{
		id: "hematuriaSeverity",
		text: "Ce saignement, où en est-il ?",
		type: "single-choice",
		conditions: [{ questionId: "urinaryProblem", answer: "hematuria" }],
		options: [
			{
				id: "activeHeavy",
				label: "J'urine du sang en ce moment, en grande quantité ou avec des caillots",
			},
			{ id: "traces", label: "Mes urines sont rosées ou brunes, sans plus" },
			{ id: "stopped", label: "J'ai saigné, mais c'est arrêté" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question commune aux sondes, aux infections urinaires et aux lésions génitales
	{
		id: "urinaryFever",
		text: "Avez-vous de la fièvre ?",
		type: "single-choice",
		conditions: [
			{
				questionId: "urinaryProblem",
				answer: ["catheterProblem", "dysuria", "genitalLesion"],
			},
		],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
