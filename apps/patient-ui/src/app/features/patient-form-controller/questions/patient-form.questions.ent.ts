import type { PatientQuestion } from "../types/patient-form.types";

export const entQuestions: PatientQuestion[] = [
	{
		id: "entArea",
		text: "Votre problème concerne :",
		type: "single-choice",
		options: [
			{ id: "eye", label: "Mes yeux" },
			{
				id: "earNoseThroat",
				label: "Mon nez, mes oreilles, ma gorge, ma bouche ou mes dents",
			},
		],
	},

	// Motifs ophtalmologiques
	{
		id: "eyeProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		conditions: [{ questionId: "entArea", answer: "eye" }],
		options: [
			{
				id: "eyeInjury",
				label: "J'ai reçu quelque chose dans l'œil, ou je me suis brûlé l'œil",
			},
			{ id: "visionTrouble", label: "Je vois mal, je ne vois plus, ou j'ai mal à l'œil" },
			{ id: "redEye", label: "J'ai l'œil rouge, ou qui me démange" },
			{ id: "other", label: "Autre" },
		],
	},

	// Motifs ORL et stomatologiques
	{
		id: "entProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		conditions: [{ questionId: "entArea", answer: "earNoseThroat" }],
		options: [
			{ id: "nosebleed", label: "Je saigne du nez" },
			{
				id: "hearingTrouble",
				label: "J'entends mal, ou j'ai des sifflements dans les oreilles",
			},
			{
				id: "neckSwelling",
				label: "J'ai une grosseur ou un gonflement dans le cou ou sur le visage",
			},
			{
				id: "entForeignBody",
				label: "J'ai quelque chose de coincé dans le nez, l'oreille ou la gorge",
			},
			{ id: "earache", label: "J'ai mal à l'oreille, ou je pense avoir une otite" },
			{ id: "soreThroat", label: "J'ai mal à la gorge, ou des plaies dans la bouche" },
			{ id: "nasalObstruction", label: "J'ai le nez bouché, un rhume ou une sinusite" },
			{ id: "dentalProblem", label: "J'ai mal à une dent ou aux gencives" },
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les traumatismes et brûlures de l'œil
	{
		id: "eyeInjuryType",
		text: "Qu'est-ce qui est entré en contact avec votre œil ?",
		type: "single-choice",
		conditions: [{ questionId: "eyeProblem", answer: "eyeInjury" }],
		options: [
			{
				id: "chemical",
				label: "Un produit chimique : produit ménager, acide, soude, solvant",
			},
			{ id: "flashOrHeat", label: "Un flash, une soudure, ou une source de chaleur" },
			{ id: "foreignObject", label: "Une poussière, un éclat, ou un objet" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les saignements de nez
	{
		id: "nosebleedAmount",
		text: "Ce saignement de nez, il est :",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "nosebleed" }],
		options: [
			{
				id: "heavy",
				label: "Abondant : ça coule en continu, ou j'ai déjà rempli plusieurs mouchoirs",
			},
			{ id: "light", label: "Peu abondant : quelques traces de sang" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les troubles de l'audition
	{
		id: "hearingTroubleType",
		text: "Votre problème d'oreille, c'est plutôt :",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "hearingTrouble" }],
		options: [
			{ id: "hearingLoss", label: "Je n'entends plus, ou beaucoup moins bien qu'avant" },
			{ id: "tinnitus", label: "J'ai des sifflements ou des bourdonnements" },
			{ id: "multipleSigns", label: "Les deux" },
		],
	},

	// Question commune aux tuméfactions et aux sinusites
	{
		id: "entFever",
		text: "Avez-vous de la fièvre ?",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: ["neckSwelling", "nasalObstruction"] }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les grosseurs du cou et du visage
	{
		id: "neckSwellingLocalSigns",
		text: "À l'endroit de cette grosseur, constatez-vous :",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "neckSwelling" }],
		options: [
			{ id: "redHotSkin", label: "Une peau rouge et chaude autour" },
			{ id: "swallowingTrouble", label: "Du mal à avaler ou à ouvrir la bouche" },
			{ id: "rapidGrowth", label: "Que ça grossit vite" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les corps étrangers ORL
	{
		id: "entForeignBodyBreathing",
		text: "Avez-vous du mal à faire entrer l'air quand vous inspirez ?",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "entForeignBody" }],
		options: [
			{ id: "yes", label: "Oui, l'air passe mal ou ça siffle quand j'inspire" },
			{ id: "no", label: "Non, je respire normalement" },
		],
	},

	// Question spécifique pour les douleurs de gorge
	{
		id: "swallowingAbility",
		text: "Arrivez-vous à avaler ?",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "soreThroat" }],
		options: [
			{
				id: "cannotSwallowAnything",
				label: "Non, je n'arrive plus à rien avaler, même pas ma salive",
			},
			{ id: "liquidsOnly", label: "Seulement les liquides" },
			{ id: "painfulButPossible", label: "Oui, mais ça fait mal" },
			{ id: "normal", label: "Oui, normalement" },
		],
	},

	// Question spécifique pour les problèmes de dents et de gencives
	{
		id: "dentalSigns",
		text: "À propos de cette dent ou de cette gencive :",
		type: "single-choice",
		conditions: [{ questionId: "entProblem", answer: "dentalProblem" }],
		options: [
			{ id: "swellingOrPus", label: "Ma joue ou ma gencive est gonflée, ou il y a du pus" },
			{
				id: "painDespitePainkillers",
				label: "La douleur ne passe pas malgré les médicaments contre la douleur",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
];
