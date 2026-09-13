import { Component, OnInit, signal } from "@angular/core";
import { toDataURL } from "qrcode";

import { environment } from "../../../environments/environment";

@Component({
	selector: "app-patient-access",
	imports: [],
	templateUrl: "./patient-access.component.html",
	styleUrl: "./patient-access.component.scss",
})
export class PatientAccess implements OnInit {
	readonly patientUiUrl = environment.patientUiUrl;
	readonly qrCodeDataUrl = signal("");

	async ngOnInit(): Promise<void> {
		const dataUrl = await toDataURL(this.patientUiUrl, {
			margin: 1,
			width: 220,
			color: {
				dark: "#0f4c81",
				light: "#ffffff",
			},
		});
		this.qrCodeDataUrl.set(dataUrl);
	}
}
