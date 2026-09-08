import type { PatientQuestion, SymptomQuestion } from "./patient-form.types";

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

export const cardiacQuestions: PatientQuestion[] = [
	{
		id: "cardiacProblem",
		text: "Quel est votre principal problème ?",
		type: "single-choice",
		options: [
			{ id: "chestPain", label: "Douleur, serrement ou gêne dans la poitrine" },
			{
				id: "coldPaleLimb",
				label: "Un bras ou une jambe est douloureux, froid, pâle ou bleu",
			},
			{ id: "faintness", label: "Malaise ou perte de connaissance" },
			{
				id: "palpitations",
				label: "Mon cœur bat vite, fort, lentement ou de façon irrégulière",
			},
			{ id: "breathlessness", label: "Je suis essoufflé de façon inhabituelle" },
			{ id: "deviceProblem", label: "Problème avec mon pacemaker ou mon défibrillateur" },
			{ id: "legSwelling", label: "Mes jambes ou mes chevilles sont gonflées" },
			{ id: "hotRedLimb", label: "Une jambe est douloureuse, chaude, rouge ou gonflée" },
			{ id: "highBloodPressure", label: "Ma tension est trop élevée" },
			{ id: "lowBloodPressure", label: "Ma tension est trop basse" },
			{ id: "other", label: "Autre" },
		],
	},

	// Questions spécifiques pour les douleurs dans la poitrine
	{
		id: "chestPainType",
		text: "Comment décririez-vous cette douleur ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "chestPain" }],
		options: [
			{ id: "tightness", label: "Un serrement, un poids ou un étau sur la poitrine" },
			{ id: "radiating", label: "Une douleur qui part vers le bras, la mâchoire ou le dos" },
			{ id: "burning", label: "Une brûlure, comme une remontée acide" },
			{ id: "sharp", label: "Une douleur qui pique, comme un coup de pointe" },
			{
				id: "positional",
				label: "Une douleur qui change quand je respire ou quand je bouge",
			},
			{ id: "idk", label: "Je n'arrive pas à décrire" },
		],
	},
	{
		id: "heartHistory",
		text: "Avez-vous déjà eu un problème de cœur, ou l'un de ces antécédents ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: ["chestPain", "other"] }],
		options: [
			{
				id: "knownHeartDisease",
				label: "Oui, j'ai déjà fait un infarctus ou j'ai un stent, un pontage",
			},
			{
				id: "riskFactors",
				label: "J'ai du diabète, du cholestérol, de la tension, ou je fume",
			},
			{ id: "none", label: "Non, aucun" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Questions spécifiques pour les troubles du rythme et les palpitations
	{
		id: "heartRate",
		text: "Si vous avez pu mesurer votre pouls (tensiomètre, montre connectée), il était de :",
		type: "single-choice",
		conditions: [
			{ questionId: "cardiacProblem", answer: ["palpitations", "lowBloodPressure"] },
		],
		options: [
			{ id: "veryFast", label: "Très rapide : plus de 180 battements par minute" },
			{ id: "fast", label: "Rapide : entre 130 et 180" },
			{ id: "slightlyFast", label: "Un peu rapide : entre 110 et 130" },
			{ id: "normal", label: "Normal : entre 50 et 110" },
			{ id: "slow", label: "Lent : entre 40 et 50" },
			{ id: "verySlow", label: "Très lent : moins de 40" },
			{ id: "unknown", label: "Je n'ai pas pu le mesurer" },
		],
	},
	{
		id: "cardiacFainting",
		text: "Avez vous fait un malaise ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "palpitations" }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},

	// Question spécifique pour l'essoufflement
	{
		id: "breathlessnessSeverity",
		text: "Dans votre essoufflement :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: ["breathlessness"] }],
		options: [
			{
				id: "whenSpeaking",
				label: "Je n'arrive pas à finir mes phrases sans reprendre mon souffle",
			},
			{
				id: "whenLyingDown",
				label: "Je n'arrive pas a respirer alongé (dans mon sommeil par exemple)",
			},
			{ id: "atRest", label: "Je suis essoufflé même sans rien faire" },
			{ id: "multiple", label: "Plusieurs de ces propositions" },
			{ id: "none", label: "Aucun de ces exemples" },
		],
	},

	// Questions spécifiques pour un membre froid, pâle ou bleu
	{
		id: "limbIschemiaSigns",
		text: "Au niveau de ce bras ou de cette jambe, avez-vous :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "coldPaleLimb" }],
		options: [
			{ id: "blueOrPurple", label: "La peau bleue ou violette" },
			{ id: "unableToMove", label: "Je n'arrive plus à le bouger normalement" },
			{ id: "noSensation", label: "Je n'ai plus de sensations, c'est engourdi" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},

	// Questions spécifiques pour la tension artérielle
	{
		id: "highBloodPressureValue",
		text: "Si vous avez mesuré votre tension, le premier chiffre (le plus grand) était :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "highBloodPressure" }],
		options: [
			{ id: "above220", label: "22 ou plus (220)" },
			{ id: "above180", label: "Entre 18 et 22 (180 à 220)" },
			{ id: "below180", label: "Moins de 18 (180)" },
			{ id: "unknown", label: "Je ne l'ai pas mesurée" },
		],
	},
	{
		id: "highBloodPressureSigns",
		text: "Avez-vous l'un de ces signes ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "highBloodPressure" }],
		options: [
			{ id: "headache", label: "Un mal de tête important" },
			{ id: "visionProblem", label: "Des troubles de la vue" },
			{ id: "nosebleed", label: "Un saignement de nez" },
			{ id: "chestPain", label: "Une douleur dans la poitrine ou du mal à respirer" },
			{ id: "multipleSigns", label: "Plusieurs de ces signes" },
			{ id: "none", label: "Aucun de ces signes" },
		],
	},
	{
		id: "lowBloodPressureValue",
		text: "Si vous avez mesuré votre tension, le premier chiffre (le plus grand) était :",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "lowBloodPressure" }],
		options: [
			{ id: "below70", label: "Moins de 7 (70)" },
			{ id: "below90", label: "Entre 7 et 9 (70 à 90)" },
			{ id: "below100", label: "Entre 9 et 10 (90 à 100)" },
			{ id: "above100", label: "Plus de 10 (100)" },
			{ id: "unknown", label: "Je ne l'ai pas mesurée" },
		],
	},

	// Question spécifique pour les pacemakers et défibrillateurs
	{
		id: "deviceShocks",
		text: "Votre appareil vous a-t-il envoyé un ou plusieurs chocs électriques ?",
		type: "single-choice",
		conditions: [{ questionId: "cardiacProblem", answer: "deviceProblem" }],
		options: [
			{ id: "yes", label: "Oui" },
			{ id: "no", label: "Non" },
			{ id: "idk", label: "Je ne sais pas" },
		],
	},
];
