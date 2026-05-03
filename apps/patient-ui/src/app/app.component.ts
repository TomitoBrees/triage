import { Component } from "@angular/core";
import { HeaderBar } from "./layout/header-bar/header-bar.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [HeaderBar]
})
export class AppComponent {}
