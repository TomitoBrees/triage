import { Component, input } from "@angular/core";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-button",
	imports: [NgClass],
	templateUrl: "./button.component.html",
	styleUrl: "./button.component.scss",
})
export class Button {
	public text = input<string>("text");
	public variant = input<"primary" | "lighter">("primary");
	public size = input<"small" | "regular" | "large">("regular");
	public disabled = input<boolean>(false);
}
