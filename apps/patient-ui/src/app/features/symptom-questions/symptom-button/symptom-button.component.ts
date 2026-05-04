import { Component, input } from "@angular/core";
import { LucideChevronRight } from "@lucide/angular";
import { NgClass } from "@angular/common";
@Component({
	selector: "app-symptom-button",
	imports: [LucideChevronRight, NgClass],
	templateUrl: "./symptom-button.component.html",
	styleUrl: "./symptom-button.component.scss",
})
export class SymptomButtonComponent {
	public symptomText = input.required<string>();
	public symptomEmoji = input<string>();
	public onClick = input<() => void>();
	public isSelected = input<boolean>(false);
}
