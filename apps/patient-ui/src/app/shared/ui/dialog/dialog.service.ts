import { Injectable, inject } from "@angular/core";
import { Dialog } from "@angular/cdk/dialog";
import { DialogComponent } from "./dialog.component";
import type { ConfirmDialogData } from "./dialog.types";

@Injectable({ providedIn: "root" })
export class DialogService {
	private readonly dialog = inject(Dialog);

	public confirm(data: ConfirmDialogData) {
		return this.dialog.open<boolean>(DialogComponent, {
			data,
			ariaLabel: data.title,
			autoFocus: "first-tabbable",
			closeOnDestroy: true,
			disableClose: false,
			hasBackdrop: true,
			panelClass: ["app-dialog-panel", `app-dialog-panel--${data.type ?? "regular"}`],
			backdropClass: [
				"app-dialog-backdrop",
				`app-dialog-backdrop--${data.type ?? "regular"}`,
			],
		});
	}
}
