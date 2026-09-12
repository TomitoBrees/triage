import { Component } from "@angular/core";

import { LandingPage } from "./features/landing-page/landing-page.component";
import { NavBar } from "./layout/nav-bar/nav-bar.component";
import { SiteFooter } from "./layout/site-footer/site-footer.component";

@Component({
	selector: "app-root",
	imports: [NavBar, LandingPage, SiteFooter],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {}
