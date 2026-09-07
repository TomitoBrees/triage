import type { PatientQuestion, SymptomQuestion } from "./patient-form-controller.types";

export const criticalSymptoms: SymptomQuestion[] = [
	{
		symptomText: "Douleur, pression ou serrement dans la poitrine",
		symptomEmoji: "🫀",
		symptomId: "chestPain",
	},
	{
		symptomText: "Difficulté à respirer ou essoufflement important au repos",
		symptomEmoji: "🫁",
		symptomId: "breathingDifficulty",
	},
	{
		symptomText: "Difficulté soudaine à parler ou à comprendre",
		symptomEmoji: "🧠",
		symptomId: "suddenSpeechDifficulty",
	},
	{
		symptomText: "Bouche ou visage qui s'affaisse d'un côté",
		symptomEmoji: "🧠",
		symptomId: "facialDrooping",
	},
	{
		symptomText: "Faiblesse soudaine d'un bras ou d'une jambe",
		symptomEmoji: "🧠",
		symptomId: "weaknessArmLeg",
	},
	{
		symptomText: "Saignement important qui ne s'arrête pas",
		symptomEmoji: "🩸",
		symptomId: "severeBleeding",
	},
	{
		symptomText:
			"Gonflement du visage, des lèvres ou de la gorge après avoir mangé ou pris un médicament",
		symptomEmoji: "💊",
		symptomId: "swellingFaceLipsThroat",
	},
];

export const generalSymptoms: SymptomQuestion[] = [
	{
		symptomText: "Blessure, chute, coup, accident, brûlure",
		symptomEmoji: "🤕",
		symptomId: "traumatological",
	},
	{
		symptomText: "Douleur au ventre, vomissements, diarrhée, problème digestif",
		symptomEmoji: "🤢",
		symptomId: "abdominal",
	},
	{
		symptomText: "Douleur à la poitrine, palpitations, problème de cœur",
		symptomEmoji: "💗",
		symptomId: "cardiac",
	},
	{
		symptomText: "Difficulté à respirer, toux, gorge, problème respiratoire",
		symptomEmoji: "🫁",
		symptomId: "respiratory",
	},
	{
		symptomText: "Fièvre, frissons, infection possible",
		symptomEmoji: "🌡️",
		symptomId: "infection",
	},
	{
		symptomText: "Mal de tête, vertiges, malaise, faiblesse, convulsion, confusion",
		symptomEmoji: "🧠",
		symptomId: "neurological",
	},
	{
		symptomText: "Douleur en urinant, problème urinaire, reins ou parties intimes",
		symptomEmoji: "🚽",
		symptomId: "urinary",
	},
	{
		symptomText: "Grossesse, douleur pelvienne, saignement vaginal, problème gynécologique",
		symptomEmoji: "🤰",
		symptomId: "gynecological",
	},
	{
		symptomText: "Problème de peau, rougeur, bouton, gonflement, allergie, piqûre",
		symptomEmoji: "✋",
		symptomId: "dermatological",
	},
	{
		symptomText: "Problème à l'œil, l'oreille, le nez, la bouche ou les dents",
		symptomEmoji: "👁️",
		symptomId: "ent",
	},
	{
		symptomText: "Angoisse, idées noires, tentative de se faire du mal, crise psychologique",
		symptomEmoji: "💭",
		symptomId: "psychological",
	},
	{
		symptomText: "Médicament, alcool, drogue, intoxication, produit avalé ou inhalé",
		symptomEmoji: "💊",
		symptomId: "intoxication",
	},
	{
		symptomText: "Grande fatigue, faiblesse générale",
		symptomEmoji: "😴",
		symptomId: "generalWeakness",
	},
];

export const sharedQuestions: PatientQuestion[] = [
	{
		id: "startTime",
		text: "Depuis quand ce problème a-t-il commencé ?",
		type: "single-choice",
		options: [
			{ id: "lessThanAnHour", label: "Moins d'une heure" },
			{ id: "oneToSixHours", label: "1 à 6 heures" },
			{ id: "today", label: "Aujourd'hui" },
			{ id: "yesterday", label: "Hier" },
			{ id: "twoToSevenDays", label: "2 à 7 jours" },
			{ id: "moreThanAWeek", label: "Plus d'une semaine" },
		],
	},
	{
		id: "startMotive",
		text: "Comment cela a-t-il commencé ?",
		type: "single-choice",
		options: [
			{ id: "brutally", label: "Brutalement, d'un coup" },
			{ id: "progressively", label: "Progressivement" },
		],
	},
	{
		id: "stillHere",
		text: "Le problème est-il présent maintenant ?",
		type: "single-choice",
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non, c'est passé" },
			{ id: "depends", label: "Ca revient par moments" },
		],
	},
	{
		id: "painScale",
		text: "À quel point cela vous gêne, vous fait mal ou vous inquiète ?",
		type: "number",
		min: 0,
		max: 10,
		step: 1,
		minLabel: "Pas du tout",
		maxLabel: "Extrêmement",
	},
	{
		id: "evolution",
		text: "Depuis le début, est-ce que ça ?",
		type: "single-choice",
		options: [
			{ id: "aggravating", label: "S'aggrave" },
			{ id: "stable", label: "Reste pareil" },
			{ id: "better", label: "S'améliore" },
			{ id: "fluctuating", label: "Fluctue entre mieux et pire par moments" },
		],
	},
	{
		id: "visitMotive",
		text: "Pourquoi venez-vous aux urgences maintenant ?",
		type: "single-choice",
		options: [
			{ id: "importantSymptoms", label: "La douleur ou les symptômes sont trop importants" },
			{ id: "aggravating", label: "Cela s'aggrave" },
			{ id: "doctorReferral", label: "Mon médecin m'a envoyé ici" },
			{ id: "noAlternative", label: "Je n'ai pas trouvé de rendez-vous ailleurs" },
			{ id: "afraid", label: "Je suis inquiet/inquiète" },
			{ id: "other", label: "Autre raison" },
		],
	},
];

export const traumaQuestions: PatientQuestion[] = [
	{
		id: "traumaType",
		text: "Que c'est-il passé ?",
		type: "single-choice",
		options: [
			{ id: "fall", label: "Chute" },
			{ id: "blow", label: "Coup ou choc direct" },
			{ id: "accident", label: "Accident de voiture, moto, vélo..." },
			{ id: "torsion", label: "Torsion ou faux mouvement" },
			{ id: "cut", label: "Coupure ou plaie" },
			{ id: "burn", label: "Brûlure" },
			{ id: "bite", label: "Morsure ou griffure" },
			{ id: "sting", label: "Piqûre" },
			{
				id: "foreignObject",
				label: "Corps étranger: écharde, verre, métal, hameçon, etc...",
			},
			{ id: "electrical", label: "Électrisation ou choc électrique" },
			{ id: "other", label: "Autre" },
		],
	},
	{
		id: "bodyPart",
		text: "Quelle est la partie du corps ou zone touchée ?",
		type: "single-choice",
		options: [
			{ id: "head", label: "Tête ou/et visage" },
			{ id: "eye", label: "Œil" },
			{ id: "neck", label: "Cou" },
			{ id: "back", label: "Dos ou/et colonne vertébrale" },
			{ id: "thorax", label: "Thorax et/ou côtes" },
			{ id: "abdomen", label: "Ventre" },
			{ id: "arm", label: "Épaule et/ou bras et/ou coude" },
			{ id: "hand", label: "Poignet et/ou main et/ou doigt" },
			{ id: "leg", label: "Jambe et/ou hanche et/ou genou" },
			{ id: "feet", label: "Pied et/ou chevilles et/ou orteils" },
			{ id: "multiple", label: "Plusieurs parties du corps" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les chutes
	{
		id: "heightOfFall",
		text: "De quelle hauteur êtes-vous tombé / ou à eu lieu la chute ?",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: "fall" }],
		options: [
			{ id: "personHeight", label: "De ma hauteur" },
			{ id: "moderateHeight", label: "Entre 2 et 3 mètres" },
			{ id: "stairs", label: "Dans les escaliers" },
			{
				id: "importantHeight",
				label: "Depuis une echelle, un toit, un arbre, une hauteur importante",
			},
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour les accidents de voiture, moto, vélo ou les coups violents
	{
		id: "highSpeedAccident",
		text: "L'incident a-t-il eu lieu a vitesse élevée ? (+ de 50km/h)",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["blow", "accident"] }],
		options: [
			{ id: "highSpeed", label: "Oui" },
			{ id: "lowSpeed", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour les traumatismes de la tête et du cou ou les accidents violents
	{
		id: "alarmingSymptoms",
		text: "Depuis le choc, avez-vous eu l'un de ces signes ?",
		type: "single-choice",
		conditions: [
			{ questionId: "bodyPart", answer: ["head", "neck"] },
			{ questionId: "traumaType", answer: ["fall", "blow", "accident", "foreignObject"] },
		],
		requireAllConditions: true,
		options: [
			{ id: "lostConsciousness", label: "Perte de connaissance, même courte" },
			{
				id: "memoryLoss",
				label: "Trou de mémoire ou je ne me souviens pas bien de l'accident",
			},
			{ id: "vomiting", label: "Vomissements" },
			{ id: "headache", label: "Mal de tête important ou qui s'aggrave" },
			{ id: "somnolence", label: "Somnolence importante ou confusion" },
			{ id: "convulsion", label: "Convulsion" },
			{
				id: "motorDifficulties",
				label: "Difficulté à parler, marcher ou bouger normalement",
			},
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "anticoagulantTreatment",
		text: "Prenez-vous un traitement anticoagulant ?",
		type: "single-choice",
		conditions: [
			{ questionId: "bodyPart", answer: ["head", "neck"] },
			{ questionId: "traumaType", answer: ["fall", "blow", "accident", "foreignObject"] },
		],
		requireAllConditions: true,
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour les membres (bras, jambes, mains, pieds)
	{
		id: "limbsSymptoms",
		text: "Concernant la zone blessée :",
		type: "single-choice",
		conditions: [{ questionId: "bodyPart", answer: ["arm", "hand", "leg", "feet"] }],
		options: [
			{ id: "unableToMove", label: "Je ne peux plus du tout bouger ou utiliser le membre" },
			{
				id: "deformity",
				label: "Il y a une déformation visible",
			},
			{ id: "limitedMovement", label: "Je peux bouger, mais avec douleur" },
			{ id: "normalMovement", label: "Je peux bouger presque normalement" },
		],
	},
	{
		id: "limbsCirculation",
		text: "Au niveau de la main, du pied ou des doigts/orteils du membre touché :",
		type: "single-choice",
		conditions: [{ questionId: "bodyPart", answer: ["arm", "hand", "leg", "feet"] }],
		options: [
			{ id: "noSensation", label: "Je n'ai plus de sensations" },
			{
				id: "significantTingling",
				label: "J'ai des fourmillements importants",
			},
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Question spécifique pour les coupures, plaies, brûlures, morsures ou piqûres
	{
		id: "openWound",
		text: "Y a-t-il une plaie ouverte ?",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["bite", "cut", "foreignObject"] }],
		options: [
			{ id: "deepWound", label: "Oui, une plaie profonde ou large" },
			{
				id: "visibleTissue",
				label: "Oui, et on voit de la graisse, un tendon, un os ou autre chose en profondeur",
			},
			{ id: "foreignBodyStuck", label: "Oui, avec un objet encore coincé dedans" },
			{ id: "superficialWound", label: "Oui, une petite plaie superficielle" },
			{ id: "none", label: "Non" },
		],
	},
	{
		id: "bleeding",
		text: "Le saignement :",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["bite", "cut", "foreignObject"] }],
		options: [
			{ id: "continuousBleeding", label: "Ne s'arrête pas malgré une compression" },
			{
				id: "moderateBleeding",
				label: "Saigne un peu",
			},
			{ id: "stoppedBleeding", label: "S'est arrêté" },
			{ id: "noBleeding", label: "Il n'y a pas eu de saignement" },
		],
	},

	// Question spécifique pour les électrisations ou chocs électriques
	{
		id: "electricShockSymptoms",
		text: "Après le choc électrique, avez-vous eu :",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["electrical"] }],
		options: [
			{ id: "lostConsciousness", label: "Une perte de connaissance" },
			{ id: "burns", label: "Une brûlure visible" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "electricShockSource",
		text: "D'où provient le choc électrique ?",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["electrical"] }],
		options: [
			{ id: "lightning", label: "Foudre" },
			{ id: "highVoltage", label: "Courant haute tension" },
			{ id: "lowVoltage", label: "Courant domestique" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
	{
		id: "electricShockDuration",
		text: "Le choc electrique a-t-il duré + de 1 seconde ?",
		type: "single-choice",
		conditions: [{ questionId: "traumaType", answer: ["electrical"] }],
		options: [
			{ id: "longElectricShock", label: "Oui" },
			{ id: "shortElectricShock", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
