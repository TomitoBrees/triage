export type DialogType = "regular" | "danger";

export type ConfirmDialogData = {
	type?: DialogType;
	title: string;
	subtitle?: string;
	message?: string;
	confirmLabel?: string;
	cancelLabel?: string;
};
