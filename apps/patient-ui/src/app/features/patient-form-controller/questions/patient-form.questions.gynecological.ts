import type { PatientQuestion } from "../types/patient-form.types";

export const gynecologicalQuestions: PatientQuestion[] = [
	{
		id: "gynecologicalProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "imminentDelivery",
				label: "Je suis en train d'accoucher, ou je viens d'accoucher",
			},
			{
				id: "pregnancyIssue",
				label: "Je suis enceinte",
			},
			{
				id: "menometrorrhagia",
				label: "J'ai des saignements en dehors de mes règles, ou des règles très abondantes",
			},
			{
				id: "postpartumIssue",
				label: "J'ai un problème depuis mon accouchement (allaitement, cicatrice, douleurs)",
			},
			{
				id: "breastProblem",
				label: "J'ai un problème au sein (boule, rougeur, douleur, écoulement)",
			},
			{
				id: "vulvovaginalProblem",
				label: "J'ai un problème vulvaire ou vaginal, ou quelque chose est resté à l'intérieur",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les grossesses
	{
		id: "pregnancyStage",
		text: "Depuis combien de temps êtes vous enceinte ? ?",
		type: "single-choice",
		conditions: [{ questionId: "gynecologicalProblem", answer: "pregnancyIssue" }],
		options: [
			{ id: "earlyStage", label: "Moins de 6 mois" },
			{ id: "lateStage", label: "6 mois ou plus" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les grossesses de moins de 6 mois
	{
		id: "pregnancySignsEarly",
		text: "Avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "pregnancyStage", answer: "earlyStage" }],
		options: [
			{ id: "bleeding", label: "Je perds du sang" },
			{ id: "pain", label: "J'ai mal au ventre ou des contractions" },
			{ id: "multipleSigns", label: "Les deux" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les grossesses de plus de 6 mois
	{
		id: "pregnancySignsLate",
		text: "Avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "pregnancyStage", answer: ["lateStage", "idk"] }],
		options: [
			{ id: "bleeding", label: "Je perds du sang" },
			{ id: "pain", label: "J'ai mal au ventre ou des contractions" },
			{ id: "waterBreaking", label: "J'ai perdu les eaux, ou je perds du liquide" },
			{
				id: "highBloodPressure",
				label: "Ma tension est trop élevée (plus de 14, ou on me l'a dit récemment)",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les saignements en dehors de la grossesse
	{
		id: "menometrorrhagiaContext",
		text: "À propos de ces saignements :",
		type: "single-choice",
		conditions: [{ questionId: "gynecologicalProblem", answer: "menometrorrhagia" }],
		options: [
			{ id: "pregnant", label: "Je suis enceinte, ou je pense l'être" },
			{
				id: "heavyBleeding",
				label: "Je saigne en continu, ou beaucoup",
			},
			{ id: "multipleSigns", label: "Les deux" },
			{ id: "none", label: "Ni l'un ni l'autre" },
		],
	},

	// Question spécifique pour les suites de couches
	{
		id: "postpartumBreastfeedingFever",
		text: "Depuis votre accouchement, où en êtes-vous ?",
		type: "single-choice",
		conditions: [{ questionId: "gynecologicalProblem", answer: "postpartumIssue" }],
		options: [
			{ id: "breastfeedingWithFever", label: "J'allaite et j'ai de la fièvre" },
			{ id: "breastfeedingWithoutFever", label: "J'allaite, mais je n'ai pas de fièvre" },
			{ id: "none", label: "Ni allaitement, ni fièvre, ou fièvre mais sans allaitement" },
		],
	},

	// Question spécifique pour les anomalies du sein
	{
		id: "breastProblemType",
		text: "Comment se présente ce problème au sein ?",
		type: "single-choice",
		conditions: [{ questionId: "gynecologicalProblem", answer: "breastProblem" }],
		options: [
			{
				id: "inflammation",
				label: "Mon sein est rouge, chaud et douloureux",
			},
			{
				id: "abscess",
				label: "J'ai une boule chaude et très douloureuse, ou du pus s'écoule",
			},
			{ id: "painlessLump", label: "J'ai senti une boule, sans rougeur ni douleur" },
			{ id: "otherBreastIssue", label: "Autre chose" },
		],
	},
];
