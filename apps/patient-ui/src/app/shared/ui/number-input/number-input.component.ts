import { Component, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";

@Component({
	selector: "app-number-input",
	imports: [FormField],
	templateUrl: "./number-input.component.html",
	styleUrl: "./number-input.component.scss",
})
export class NumberInputComponent {
	public field = input.required<FieldTree<number>>();
	public label = input<string>("");
	public placeholder = input<string>("");
}
