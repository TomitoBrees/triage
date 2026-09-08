import type { PatientQuestion } from "../types/patient-form.types";

export const dermatologicalQuestions: PatientQuestion[] = [
	{
		id: "dermatologicalProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{
				id: "spontaneousBruise",
				label: "J'ai un bleu ou une poche de sang apparue toute seule, sans m'être cogné",
			},
			{
				id: "abscess",
				label: "J'ai un abcès, un bouton infecté, ou une zone rouge et chaude",
			},
			{
				id: "rashOrSwelling",
				label: "J'ai des plaques, des boutons, une éruption ou un gonflement apparu tout seul",
			},
			{
				id: "biteOrSting",
				label: "J'ai été mordu ou piqué, ou ça me gratte",
			},
			{
				id: "foreignBody",
				label: "J'ai quelque chose de planté sous la peau (écharde, épine, éclat...)",
			},
			{ id: "other", label: "Autre" },
		],
	},

	// Question commune aux abcès, aux éruptions et aux piqûres
	{
		id: "skinFever",
		text: "Avez-vous de la fièvre ?",
		type: "single-choice",
		conditions: [
			{
				questionId: "dermatologicalProblem",
				answer: ["abscess", "rashOrSwelling", "biteOrSting"],
			},
		],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les abcès
	{
		id: "abscessSize",
		text: "Quelle est la taille de cet abcès ?",
		type: "single-choice",
		conditions: [{ questionId: "dermatologicalProblem", answer: "abscess" }],
		options: [
			{ id: "large", label: "Volumineux, plus gros qu'une noix" },
			{ id: "small", label: "Petit, comme un gros bouton" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question commune aux éruptions et aux piqûres
	{
		id: "skinExtent",
		text: "Sur quelle surface de peau cela s'étend-il ?",
		type: "single-choice",
		conditions: [
			{ questionId: "dermatologicalProblem", answer: ["rashOrSwelling", "biteOrSting"] },
		],
		options: [
			{ id: "localized", label: "À un seul endroit, une petite zone" },
			{ id: "extended", label: "Sur une grande partie du corps, ou à plusieurs endroits" },
		],
	},

	// Question spécifique pour les éruptions et les gonflements
	{
		id: "anaphylaxisSigns",
		text: "Avec cette éruption ou ce gonflement, avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "dermatologicalProblem", answer: "rashOrSwelling" }],
		options: [
			{ id: "throatSwelling", label: "Mes lèvres, ma langue ou ma gorge gonflent" },
			{ id: "breathingDifficulty", label: "J'ai du mal à respirer, ou ma voix a changé" },
			{ id: "faintness", label: "Je me sens partir, ou mon cœur s'emballe" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Questions spécifiques pour les morsures, piqûres et parasitoses
	{
		id: "biteType",
		text: "Qu'est-ce qui vous a mordu, piqué ou infesté ?",
		type: "single-choice",
		conditions: [{ questionId: "dermatologicalProblem", answer: "biteOrSting" }],
		options: [
			{
				id: "venomousAnimal",
				label: "Un serpent, un scorpion, une araignée ou un autre animal venimeux",
			},
			{ id: "insect", label: "Un insecte : guêpe, abeille, moustique, tique" },
			{ id: "parasites", label: "Des parasites : poux, gale, puces, punaises" },
			{ id: "none", label: "Aucune de ces propositions" },
			{ id: "idk", label: "Je ne sais pas ce que c'était" },
		],
	},
	{
		id: "biteLocalSigns",
		text: "À l'endroit de la piqûre ou de la morsure, constatez-vous :",
		type: "single-choice",
		conditions: [{ questionId: "dermatologicalProblem", answer: "biteOrSting" }],
		options: [
			{ id: "spreadingRedness", label: "Une rougeur qui s'étend autour" },
			{ id: "majorSwelling", label: "Un gonflement important" },
			{ id: "pusOrWound", label: "Du pus, ou une plaie qui s'infecte" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les corps étrangers sous la peau
	{
		id: "foreignBodyComplexity",
		text: "Ce qui est planté sous votre peau, c'est :",
		type: "single-choice",
		conditions: [{ questionId: "dermatologicalProblem", answer: "foreignBody" }],
		options: [
			{ id: "multipleOrDeep", label: "Plusieurs morceaux, ou un seul mais profond" },
			{ id: "single", label: "Un seul morceau, juste sous la peau" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
