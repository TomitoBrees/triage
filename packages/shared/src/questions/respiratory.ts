import type { PatientQuestion } from "../patient-questions";

export const respiratoryQuestions: PatientQuestion[] = [
	{
		id: "respiratoryProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{ id: "breathlessness", label: "J'ai du mal à respirer, je suis essoufflé" },
			{
				id: "asthmaCopd",
				label: "Une crise d'asthme, ou ma bronchite chronique (BPCO) qui s'aggrave",
			},
			{ id: "bloodInCough", label: "Je crache ou tousse du sang" },
			{ id: "chestPainBreathing", label: "J'ai mal dans la poitrine quand je respire" },
			{
				id: "foreignBody",
				label: "Quelque chose est bloqué dans ma gorge ou dans mes voies respiratoires",
			},
			{ id: "cough", label: "Je tousse, j'ai une bronchite ou un rhume" },
			{ id: "other", label: "Autre" },
		],
	},

	// Questions communes à tous les motifs respiratoires sauf la toux simple
	{
		id: "respiratoryDistressSigns",
		text: "Avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [
			{
				questionId: "respiratoryProblem",
				answer: [
					"breathlessness",
					"asthmaCopd",
					"bloodInCough",
					"chestPainBreathing",
					"foreignBody",
				],
			},
		],
		options: [
			{ id: "blueLips", label: "Mes lèvres, mon visage ou mes doigts sont bleus" },
			{ id: "cannotSpeak", label: "Je n'arrive plus du tout à parler" },
			{
				id: "exhausted",
				label: "Je suis épuisé, je n'ai plus la force de respirer",
			},
			{
				id: "confused",
				label: "Je suis confus, désorienté, ou j'ai l'impression de m'évanouir",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "breathingSeverity",
		text: "Comment respirez-vous en ce moment ?",
		type: "single-choice",
		conditions: [
			{
				questionId: "respiratoryProblem",
				answer: [
					"breathlessness",
					"asthmaCopd",
					"bloodInCough",
					"chestPainBreathing",
					"foreignBody",
				],
			},
		],
		options: [
			{
				id: "whenSpeaking",
				label: "Je n'arrive pas à finir mes phrases sans reprendre mon souffle",
			},
			{
				id: "chestSucking",
				label: "Ma poitrine ou mon cou se creuse à chaque respiration",
			},
			{
				id: "whenLyingDown",
				label: "Je ne peux pas respirer allongé, je dois rester assis",
			},
			{ id: "multiple", label: "Plusieurs de ces propositions" },
			{ id: "none", label: "Aucune de ces propositions" },
		],
	},

	// Question spécifique pour la dyspnée et l'insuffisance respiratoire
	{
		id: "oxygenSaturation",
		text: "Si vous avez pu mesurer votre taux d'oxygène (saturomètre au doigt, montre connectée), il était de :",
		type: "single-choice",
		conditions: [{ questionId: "respiratoryProblem", answer: "breathlessness" }],
		options: [
			{ id: "below86", label: "Moins de 86 %" },
			{ id: "from86To90", label: "Entre 86 et 90 %" },
			{ id: "from91To94", label: "Entre 91 et 94 %" },
			{ id: "above94", label: "95 % ou plus" },
			{ id: "unknown", label: "Je n'ai pas pu le mesurer" },
		],
	},

	// Questions spécifiques pour l'asthme et la BPCO
	{
		id: "asthmaType",
		text: "De quoi souffrez-vous habituellement ?",
		type: "single-choice",
		conditions: [{ questionId: "respiratoryProblem", answer: "asthmaCopd" }],
		options: [
			{ id: "asthma", label: "D'asthme" },
			{ id: "copd", label: "D'une BPCO, d'une bronchite chronique ou d'un emphysème" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
	{
		id: "peakFlow",
		text: "Si vous avez pu souffler dans votre débitmètre, la mesure était de :",
		type: "single-choice",
		conditions: [{ questionId: "respiratoryProblem", answer: "asthmaCopd" }],
		options: [
			{ id: "below200", label: "200 ou moins" },
			{ id: "from200To300", label: "Entre 200 et 300" },
			{ id: "above300", label: "300 ou plus" },
			{ id: "unknown", label: "Je n'ai pas pu le mesurer" },
		],
	},

	// Question spécifique pour hémoptysie
	{
		id: "hemoptysisAmount",
		text: "Quand vous crachez du sang, c'est :",
		type: "single-choice",
		conditions: [{ questionId: "respiratoryProblem", answer: "bloodInCough" }],
		options: [
			{ id: "abundant", label: "Beaucoup de sang, en grande quantité" },
			{ id: "repeated", label: "Plusieurs fois, en petite quantité" },
			{ id: "once", label: "Une seule fois, quelques traces de sang" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour la toux et la bronchite
	{
		id: "coughSigns",
		text: "Avec cette toux, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "respiratoryProblem", answer: "cough" }],
		options: [
			{ id: "fever", label: "De la fièvre" },
			{ id: "breathlessness", label: "Un essoufflement inhabituel" },
			{ id: "chestPain", label: "Une douleur dans la poitrine quand je respire" },
			{ id: "wheezing", label: "Des sifflements quand je respire" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
];
