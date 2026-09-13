import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavBar } from "./layout/nav-bar/nav-bar.component";
import { SiteFooter } from "./layout/site-footer/site-footer.component";

@Component({
	selector: "app-root",
	imports: [NavBar, RouterOutlet, SiteFooter],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {}
