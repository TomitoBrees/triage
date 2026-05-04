import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";

@Component({
	selector: "app-text-input",
	imports: [FormField],
	templateUrl: "./text-input.component.html",
	styleUrl: "./text-input.component.scss",
})
export class TextInputComponent {
	public field = input.required<FieldTree<string>>();
	public label = input<string>("");
	public placeholder = input<string>("");
}
