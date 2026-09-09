import { Component } from "@angular/core";

@Component({
	selector: "app-nav-bar",
	imports: [],
	templateUrl: "./nav-bar.component.html",
	styleUrl: "./nav-bar.component.scss",
})
export class NavBar {
	readonly operator = "IAO - T. L'Hotellier";
	readonly lastUpdate = new Date().toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}
