import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
	selector: "app-shell",
	imports: [RouterLink, RouterOutlet],
	templateUrl: "./app-shell.component.html",
	styleUrl: "./app-shell.component.css",
})
export class AppShellComponent {}
