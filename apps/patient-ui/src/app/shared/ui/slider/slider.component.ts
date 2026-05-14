import { Component, computed, input, output } from "@angular/core";

let nextSliderId = 0;

@Component({
	selector: "app-slider",
	imports: [],
	templateUrl: "./slider.component.html",
	styleUrl: "./slider.component.scss",
})
export class SliderComponent {
	public value = input<number>(0);
	public valueChange = output<number>();
	public min = input<number>(0);
	public max = input<number>(10);
	public step = input<number>(1);
	public minLabel = input<string>("Pas du tout");
	public maxLabel = input<string>("Extrêmement");
	public id = input<string>(`app-slider-${nextSliderId++}`);

	protected progress = computed(() => {
		const range = this.max() - this.min();

		if (range <= 0) {
			return 0;
		}

		const value = Math.min(Math.max(this.value(), this.min()), this.max());

		return ((value - this.min()) / range) * 100;
	});

	protected progressStyle = computed(() => `${this.progress()}%`);

	protected ticks = computed(() => {
		const min = this.min();
		const max = this.max();
		const step = this.step();

		if (step <= 0 || max < min) {
			return [min, max];
		}

		const count = Math.floor((max - min) / step) + 1;
		const ticks = Array.from({ length: count }, (_, index) => min + index * step);

		if (ticks.at(-1) !== max) {
			ticks.push(max);
		}

		return ticks;
	});

	protected onValueChange(event: Event): void {
		const value = Number((event.target as HTMLInputElement).value);

		this.valueChange.emit(value);
	}
}
