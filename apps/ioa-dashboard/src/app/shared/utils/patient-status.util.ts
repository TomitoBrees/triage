export const patientStatuses = ["waiting", "inProgress", "seen", "discharged"] as const;

export type PatientStatus = (typeof patientStatuses)[number];

export const patientStatusFrenchLabels: Record<PatientStatus, string> = {
	waiting: "Attente",
	inProgress: "En cours",
	seen: "Vu",
	discharged: "Sorti",
};
