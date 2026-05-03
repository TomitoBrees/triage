import { Component, input } from "@angular/core";
import { LucideChevronRight } from "@lucide/angular";

@Component({
	selector: "app-symptom-button",
	imports: [LucideChevronRight],
	templateUrl: "./symptom-button.component.html",
	styleUrl: "./symptom-button.component.scss",
})
export class SymptomButtonComponent {
	public symptomText = input.required<string>();
	public symptomEmoji = input<string>();
	public onClick = input<() => void>();
}
