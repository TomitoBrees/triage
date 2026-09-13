import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { environment } from "../../../environments/environment";

interface LandingStep {
	n: string;
	title: string;
	text: string;
}

@Component({
	selector: "app-landing-page",
	imports: [RouterLink],
	templateUrl: "./landing-page.component.html",
	styleUrl: "./landing-page.component.scss",
})
export class LandingPage {
	readonly ioaDashboardUrl = environment.ioaDashboardUrl;

	readonly points: string[] = [
		"Le patient scanne un QR code en salle d'attente, sans installation ni compte.",
		"Il répond à un questionnaire court, adapté à son symptôme principal.",
		"Le score FRENCH est calculé à partir de ses réponses.",
		"L'IAO voit la file classée par niveau de priorité, puis par heure d'arrivée.",
	];

	readonly steps: LandingStep[] = [
		{
			n: "01",
			title: "Scan du QR code",
			text: "À l'arrivée, en salle d'attente, sans installation.",
		},
		{
			n: "02",
			title: "Questionnaire ciblé",
			text: "Questions communes puis questions propres au symptôme déclaré.",
		},
		{
			n: "03",
			title: "Score FRENCH",
			text: "Calculé côté serveur à partir des réponses.",
		},
		{
			n: "04",
			title: "File priorisée",
			text: "Affichage immédiat au poste de l'IAO, par niveau puis par heure.",
		},
	];
}
