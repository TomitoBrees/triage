import { Component, computed, input } from "@angular/core";
import { FieldTree, FormField } from "@angular/forms/signals";

@Component({
	selector: "app-text-area",
	imports: [FormField],
	templateUrl: "./text-area.component.html",
	styleUrl: "./text-area.component.scss",
})
export class TextAreaComponent {
	public field = input.required<FieldTree<string>>();
	public label = input<string>("");
	public placeholder = input<string>("");
	public rows = input<number>(5);

	protected isRequired = computed(() => this.field()().required());

	protected maxLength = computed(() => this.field()().maxLength?.() ?? null);

	protected characterCount = computed(() => this.field()().value().length);

	protected showError = computed(() => {
		const field = this.field();
		return field().touched() && field().invalid();
	});

	protected errorMessage = computed(() => {
		const field = this.field();
		return field().errors()[0]?.message ?? "";
	});
}
