import { DIALOG_DATA, DialogRef } from "@angular/cdk/dialog";
import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import type { ConfirmDialogData } from "./dialog.types";

@Component({
	selector: "app-confirm-dialog",
	imports: [NgClass],
	templateUrl: "./dialog.component.html",
	styleUrl: "./dialog.component.scss",
})
export class DialogComponent {
	protected readonly data = inject<ConfirmDialogData>(DIALOG_DATA);
	private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);

	protected readonly type = this.data.type ?? "regular";
	protected readonly confirmLabel = this.data.confirmLabel ?? "Confirmer";
	protected readonly cancelLabel = this.data.cancelLabel ?? "Annuler";

	protected confirm() {
		this.dialogRef.close(true);
	}

	protected cancel() {
		this.dialogRef.close(false);
	}
}
