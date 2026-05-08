import type { PatientQuestion } from "./patient-questionnaire.types";

export const criticalQuestions: PatientQuestion[] = [
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

export const moderateSymptomQuestions: PatientQuestion[] = [
	{
		symptomText: "Choc violent à la tete ou au cou",
		symptomEmoji: "🤕",
		symptomId: "headInjury",
	},
	{
		symptomText: "Tentative de vous faire du mal ou peur de le faire",
		symptomEmoji: "😢",
		symptomId: "sucidalIdeation",
	},
	{
		symptomText: "Douleur abdominale intense ou saignement important pendant la grossesse",
		symptomEmoji: "🤰",
		symptomId: "abdominalPainPregnant",
	},
];

export const moderateFollowUpQuestions = {
	headInjury: [
		{
			id: "headInjury",
			text: "Avez-vous perdu connaissance ?",
			type: "boolean",
		},
		{
			id: "vomiting",
			text: "Avez-vous vomi depuis le choc ?",
			type: "boolean",
		},
	],
	sucidalIdeation: [
		{
			id: "currentDanger",
			text: "Vous sentez-vous en danger immédiat ?",
			type: "boolean",
		},
	],
	abdominalPainPregnant: [
		{
			id: "bleeding",
			text: "Avez-vous des saignements importants ?",
			type: "boolean",
		},
	],
};
