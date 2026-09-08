import type { PatientQuestion } from "../types/patient-form.types";

export const infectionQuestions: PatientQuestion[] = [
	{
		id: "infectionProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "bloodExposure",
				label: "Je me suis piqué, coupé ou j'ai été en contact avec le sang ou un liquide biologique de quelqu'un",
			},
			{ id: "fever", label: "J'ai de la fièvre" },
			{
				id: "contagiousContact",
				label: "J'ai été en contact avec une personne atteinte d'une maladie contagieuse",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Questions spécifiques pour les accidents d'exposition au sang
	{
		id: "exposureDelay",
		text: "Depuis combien de temps ce contact a-t-il eu lieu ?",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "bloodExposure" }],
		options: [
			{ id: "under48h", label: "Moins de 48 heures" },
			{ id: "over48h", label: "48 heures ou plus" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
	{
		id: "exposureSourceStatus",
		text: "La personne concernée est-elle porteuse du VIH (sida) ?",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "bloodExposure" }],
		options: [
			{ id: "hivPositive", label: "Oui, c'est confirmé, elle est séropositive" },
			{ id: "hivNegative", label: "Non" },
			{ id: "idk", label: "Je ne sais pas, ou je ne connais pas cette personne" },
		],
	},

	// Questions spécifiques pour la fièvre
	{
		id: "temperature",
		text: "Si vous avez pu prendre votre température, elle était de :",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "fever" }],
		options: [
			{ id: "above40", label: "40 °C ou plus" },
			{ id: "from38To40", label: "Entre 38 et 40 °C" },
			{ id: "normal", label: "Entre 35,2 et 38 °C" },
			{ id: "below352", label: "35,2 °C ou moins" },
			{ id: "unknown", label: "Je n'ai pas pu la prendre" },
		],
	},
	{
		id: "feverSigns",
		text: "Avec cette fièvre, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "fever" }],
		options: [
			{
				id: "confusion",
				label: "Je suis confus, désorienté, ou mon entourage me trouve bizarre",
			},
			{ id: "headache", label: "Un mal de tête important" },
			{
				id: "purpura",
				label: "Des taches rouges ou violettes sur la peau, qui ne s'effacent pas quand j'appuie dessus",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "feverTolerance",
		text: "Comment supportez-vous cette fièvre ?",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "fever" }],
		options: [
			{ id: "faintness", label: "Je ne tiens pas debout, je me sens partir" },
			{
				id: "lowBloodPressure",
				label: "J'ai mesuré ma tension : le premier chiffre est en dessous de 10 (100)",
			},
			{
				id: "pulseAboveBloodPressure",
				label: "Mon appareil affiche un pouls plus élevé que le premier chiffre de ma tension (par exemple pouls 110 et tension 10)",
			},
			{ id: "multipleSigns", label: "Plusieurs de ces propositions" },
			{ id: "none", label: "Je la supporte, je reste capable de me déplacer" },
		],
	},

	// Question spécifique pour l'exposition à une maladie contagieuse
	{
		id: "contagiousDiseaseRisk",
		text: "De quelle maladie cette personne est-elle atteinte ?",
		type: "single-choice",
		conditions: [{ questionId: "infectionProblem", answer: "contagiousContact" }],
		options: [
			{
				id: "lifeThreatening",
				label: "Une méningite, une tuberculose, ou une maladie grave type Ebola",
			},
			{
				id: "common",
				label: "Une rougeole, une varicelle, une grippe, une gastro-entérite ou similaire",
			},
			{ id: "none", label: "Aucune de ces propositions" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
