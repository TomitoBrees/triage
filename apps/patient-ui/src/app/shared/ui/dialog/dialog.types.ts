export type DialogType = "regular" | "danger";

export type ConfirmDialogData = {
	type?: DialogType;
	title: string;
	message?: string;
	confirmLabel?: string;
	cancelLabel?: string;
};
