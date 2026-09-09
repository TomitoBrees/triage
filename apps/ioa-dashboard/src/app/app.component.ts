import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { NavBar } from "./layout/nav-bar/nav-bar.component";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, NavBar],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {}
