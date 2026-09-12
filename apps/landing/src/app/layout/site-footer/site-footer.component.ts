import { Component } from "@angular/core";

import { environment } from "../../../environments/environment";

@Component({
	selector: "app-site-footer",
	imports: [],
	templateUrl: "./site-footer.component.html",
	styleUrl: "./site-footer.component.scss",
})
export class SiteFooter {
	readonly linkedinUrl = environment.linkedinUrl;
	readonly githubUrl = environment.githubUrl;
}
