export const patientStatuses = ["waiting", "seen", "discharged"] as const;

export type PatientStatus = (typeof patientStatuses)[number];

export const patientStatusFrenchLabels: Record<PatientStatus, string> = {
	waiting: "Attente",
	seen: "Vu",
	discharged: "Sorti",
};
