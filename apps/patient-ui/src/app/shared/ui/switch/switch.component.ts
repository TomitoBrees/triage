import { Component, computed, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";

@Component({
	selector: "app-switch",
	imports: [FormField],
	templateUrl: "./switch.component.html",
	styleUrl: "./switch.component.scss",
})
export class SwitchComponent {
	public field = input.required<FieldTree<boolean>>();
	public label = input<string>("");
	public displayedFirstText = input<string>("Yes");
	public displayedSecondText = input<string>("No");
	public ariaLabel = input<string>("Toggle option");

	protected firstSelected = computed(() => this.field()().value());
}
