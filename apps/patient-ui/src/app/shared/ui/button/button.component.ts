import { Component, input } from "@angular/core";

@Component({
	selector: "app-button",
	imports: [],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class Button {
	public text = input<string>("text");
	public variant = input<"primary">("primary");
	public size = input<"regular">("regular");
}
