export type PatientQuestionAnswer = string | number | boolean;

export type FollowUpOption = {
	id: string;
	label: string;
};

export type PatientQuestionCondition = {
	questionId: string;
	answer: PatientQuestionAnswer | PatientQuestionAnswer[];
};

type PatientQuestionBase = {
	id: string;
	text: string;
	conditions?: PatientQuestionCondition[];
	requireAllConditions?: boolean;
};

export type PatientQuestion =
	| (PatientQuestionBase & {
			type: "boolean";
	  })
	| (PatientQuestionBase & {
			type: "single-choice";
			options: FollowUpOption[];
	  })
	| (PatientQuestionBase & {
			type: "number";
			min?: number;
			max?: number;
			step?: number;
			minLabel?: string;
			maxLabel?: string;
	  });

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

export function answerLabel(
	question: PatientQuestion,
	value: PatientQuestionAnswer | null | undefined,
): string | null {
	if (value === null || value === undefined) return null;

	if (question.type === "single-choice") {
		return question.options.find((option) => option.id === value)?.label ?? null;
	}

	if (question.type === "boolean") return value ? "Oui" : "Non";

	return String(value);
}

export function sharedAnswerLabel(
	questionId: string,
	value: PatientQuestionAnswer | null | undefined,
): string | null {
	const question = sharedQuestions.find((candidate) => candidate.id === questionId);
	if (!question) return null;

	return answerLabel(question, value);
}
