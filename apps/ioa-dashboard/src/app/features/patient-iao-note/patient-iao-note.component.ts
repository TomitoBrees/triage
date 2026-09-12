import { Component, computed, input, output, signal } from "@angular/core";

@Component({
	selector: "app-patient-iao-note",
	imports: [],
	templateUrl: "./patient-iao-note.component.html",
	styleUrl: "./patient-iao-note.component.scss",
})
export class PatientIaoNote {
	public note = input<string>("");

	public noteChange = output<string>();

	protected draft = signal("");

	protected canSave = computed(() => this.draft().trim().length > 0);

	protected updateDraft(event: Event): void {
		this.draft.set((event.target as HTMLTextAreaElement).value);
	}

	protected save(): void {
		this.noteChange.emit(this.draft().trim());
		this.draft.set("");
	}

	protected clear(): void {
		this.noteChange.emit("");
		this.draft.set("");
	}
}
