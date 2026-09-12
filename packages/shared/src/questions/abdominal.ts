import type { PatientQuestion } from "../patient-questions";

export const abdominalQuestions: PatientQuestion[] = [
	{
		id: "abdominalProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{ id: "abdominalPain", label: "Douleur au ventre" },
			{ id: "vomiting", label: "Vomissements" },
			{ id: "bloodInStool", label: "Du sang dans les selles ou selles noires" },
			{ id: "ictere", label: "J'ai la peau, la salive ou les yeux jaunes" },
			{ id: "diarrhea", label: "Diarrhée" },
			{ id: "constipation", label: "Constipation, je n'arrive plus à aller à la selle" },
			{ id: "analPain", label: "Douleur au niveau de l'anus" },
			{ id: "lump", label: "Hernie, boule ou ventre gonflé" },
			{ id: "swallowedObject", label: "J'ai avalé un objet" },
			{ id: "rectalObject", label: "Un objet est bloqué dans mon anus" },
			{ id: "hiccups", label: "Hoquet qui ne s'arrête pas" },
			{
				id: "stomaProblem",
				label: "Problème de poche ou de cicatrice d'opération",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Question spécifique pour les vomissements de sang
	{
		id: "bloodVomiting",
		text: "Dans vos vomissements, il y a :",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "vomiting" }],
		options: [
			{ id: "abundantBlood", label: "Beaucoup de sang, du sang rouge ou des caillots" },
			{ id: "bloodStreaks", label: "Quelques filets ou traces de sang" },
			{ id: "noBlood", label: "Pas de sang" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour le sang dans les selles
	{
		id: "bloodInStoolAmount",
		text: "Concernant le sang dans les selles :",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "bloodInStool" }],
		options: [
			{ id: "abundant", label: "Un saignement abondant, du sang rouge en quantité" },
			{ id: "blackStools", label: "Des selles noires comme du goudron" },
			{ id: "stained", label: "Des selles tachées de sang ou du sang sur le papier" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour les objets avalés
	{
		id: "swallowedObjectType",
		text: "Quel type d'objet avez-vous avalé ?",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "swallowedObject" }],
		options: [
			{ id: "sharp", label: "Tranchant ou pointu : lame, aiguille, os, cure-dent..." },
			{ id: "battery", label: "Une pile ou un aimant" },
			{ id: "blunt", label: "Lisse et arrondi : pièce, bille, bouton..." },
			{ id: "none", label: "Aucun de ses choix" },
		],
	},
	{
		id: "swallowedObjectSymptoms",
		text: "Depuis, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "swallowedObject" }],
		options: [
			{ id: "unableToSwallow", label: "Je n'arrive plus à avaler, même ma salive" },
			{ id: "drooling", label: "Je bave, la salive déborde de ma bouche" },
			{ id: "chestPain", label: "J'ai mal dans la poitrine ou du mal à respirer" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les objets bloqués dans le rectum
	{
		id: "rectalObjectSymptoms",
		text: "Depuis, avez-vous des saignements par l'anus ?",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "rectalObject" }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour la constipation, les vomissements et les hernies/masses
	{
		id: "occlusionSymptoms",
		text: "Concernant votre transit, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [
			{ questionId: "abdominalProblem", answer: ["constipation", "vomiting", "lump"] },
		],
		options: [
			{ id: "noGasNoStool", label: "Je n'ai plus de gaz ni de selles du tout" },
			{ id: "bloatedAndVomiting", label: "Le ventre gonflé et/ou des vomissements" },
			{ id: "abdominalPain", label: "Mal au ventre" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "vomitingFrequency",
		text: "Depuis le début, vous avez vomi :",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "vomiting" }],
		options: [
			{ id: "abundant", label: "Très souvent, plus de 5 fois ou sans pouvoir m'arrêter" },
			{ id: "several", label: "Plusieurs fois" },
			{ id: "once", label: "Une ou deux fois" },
		],
	},

	// Question spécifique pour la diarrhée
	{
		id: "diarrheaFrequency",
		text: "Combien de selles liquides avez-vous par jour ?",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "diarrhea" }],
		options: [
			{ id: "abundant", label: "Plus de 6, ou des selles très abondantes" },
			{ id: "few", label: "Moins de 6, ou peu de selles" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les douleurs anales
	{
		id: "analPainSigns",
		text: "Au niveau de l'anus, avez-vous :",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "analPain" }],
		options: [
			{ id: "lumpOrPus", label: "Une boule dure, chaude, gonflée ou du pus" },
			{
				id: "painWhenPassingStool",
				label: "Une douleur vive en allant à la selle, parfois avec du sang",
			},
			{ id: "none", label: "Aucun de ces signes" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour le hoquet
	{
		id: "hiccupsDuration",
		text: "Votre hoquet dure depuis :",
		type: "single-choice",
		conditions: [{ questionId: "abdominalProblem", answer: "hiccups" }],
		options: [
			{ id: "moreThan12Hours", label: "Plus de 12 heures, sans s'arrêter" },
			{ id: "lessThan12Hours", label: "Moins de 12 heures" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
