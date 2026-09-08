import type { PatientQuestion } from "../types/patient-form.types";

export const intoxicationQuestions: PatientQuestion[] = [
	{
		id: "intoxicationProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "drugIntoxication",
				label: "J'ai pris trop de médicaments, ou des médicaments qui ne m'étaient pas destinés",
			},
			{
				id: "nonDrugIntoxication",
				label: "J'ai avalé, respiré ou touché un produit toxique : produit ménager, gaz, plante, champignon, drogue...",
			},
			{
				id: "withdrawalRequest",
				label: "Je veux arrêter l'alcool ou la drogue, ou je suis en manque",
			},
			{ id: "drunkenness", label: "J'ai trop bu d'alcool" },
			{ id: "other", label: "Autre" },
		],
	},

	// Question commune aux deux types d'intoxication
	{
		id: "intoxicationTolerance",
		text: "Depuis, comment vous sentez-vous ?",
		type: "single-choice",
		conditions: [
			{
				questionId: "intoxicationProblem",
				answer: ["drugIntoxication", "nonDrugIntoxication"],
			},
		],
		options: [
			{ id: "drowsiness", label: "Très somnolent, j'ai du mal à rester éveillé" },
			{ id: "vomiting", label: "Je vomis, ou j'ai très mal au ventre" },
			{ id: "faintness", label: "Je me sens partir, la tête tourne, mon cœur s'emballe" },
			{ id: "breathingTrouble", label: "J'ai du mal à respirer" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Je me sens bien, je n'ai aucun de ces signes" },
		],
	},

	// Questions spécifiques pour les intoxications médicamenteuses
	{
		id: "intoxicationIntent",
		text: "Était-ce dans le but de vous faire du mal ?",
		type: "single-choice",
		conditions: [{ questionId: "intoxicationProblem", answer: "drugIntoxication" }],
		options: [
			{ id: "suicidal", label: "Oui" },
			{ id: "accidental", label: "Non, c'était une erreur ou un accident" },
			{ id: "recreational", label: "Non, c'était pour me soulager ou pour l'effet" },
			{ id: "noAnswer", label: "Je préfère ne pas répondre" },
		],
	},
	{
		id: "drugType",
		text: "De quels médicaments s'agit-il ?",
		type: "single-choice",
		conditions: [{ questionId: "intoxicationProblem", answer: "drugIntoxication" }],
		options: [
			{ id: "cardiacDrugs", label: "Des médicaments pour le cœur ou pour la tension" },
			{ id: "paracetamol", label: "Du paracétamol : Doliprane, Dafalgan, Efferalgan" },
			{
				id: "psychiatricDrugs",
				label: "Des somnifères, des calmants ou des antidépresseurs",
			},
			{ id: "otherDrugs", label: "D'autres médicaments" },
			{ id: "idk", label: "Je ne sais pas, ou plusieurs médicaments différents" },
		],
	},

	// Question spécifique pour les intoxications non médicamenteuses
	{
		id: "toxicProductType",
		text: "De quel produit s'agit-il ?",
		type: "single-choice",
		conditions: [{ questionId: "intoxicationProblem", answer: "nonDrugIntoxication" }],
		options: [
			{
				id: "causticOrCorrosive",
				label: "Un produit qui brûle : déboucheur, soude, acide, javel concentrée",
			},
			{
				id: "gasOrFumes",
				label: "Un gaz ou des fumées : monoxyde de carbone, fumée d'incendie",
			},
			{ id: "plantOrMushroom", label: "Une plante ou un champignon" },
			{ id: "drug", label: "De la drogue" },
			{
				id: "householdProduct",
				label: "Un produit ménager courant : savon, lessive, cosmétique",
			},
			{ id: "idk", label: "Je ne sais pas ce que c'était" },
		],
	},

	// Question spécifique pour les demandes de sevrage
	{
		id: "withdrawalContext",
		text: "Pourquoi venez-vous aujourd'hui ?",
		type: "single-choice",
		conditions: [{ questionId: "intoxicationProblem", answer: "withdrawalRequest" }],
		options: [
			{ id: "agitationOrViolence", label: "Je suis très agité, ou je me suis emporté" },
			{
				id: "withdrawalSymptoms",
				label: "Je suis en manque : tremblements, sueurs, angoisse, douleurs",
			},
			{
				id: "prescriptionRequest",
				label: "Je viens chercher une ordonnance pour mon traitement de substitution",
			},
			{ id: "careRequest", label: "Je veux être aidé pour arrêter" },
		],
	},

	// Question spécifique pour les ivresses
	{
		id: "drunkennessContext",
		text: "En ce moment, dans quelle situation êtes-vous ?",
		type: "single-choice",
		conditions: [{ questionId: "intoxicationProblem", answer: "drunkenness" }],
		options: [
			{
				id: "agitationOrViolence",
				label: "Je suis très agité, je me suis emporté, ou il y a eu une bagarre",
			},
			{
				id: "policeRequest",
				label: "Je suis accompagné par la police ou la gendarmerie",
			},
			{ id: "multipleSigns", label: "Les deux" },
			{ id: "none", label: "Ni l'un ni l'autre" },
		],
	},
];
