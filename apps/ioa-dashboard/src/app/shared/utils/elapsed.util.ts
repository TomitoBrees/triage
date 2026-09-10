const MINUTE_IN_MS = 60_000;
const MINUTES_IN_HOUR = 60;

export function elapsedMinutesSince(arrival: Date): number {
	const elapsed = Math.floor((Date.now() - new Date(arrival).getTime()) / MINUTE_IN_MS);
	return Math.max(elapsed, 0);
}

export function formatElapsed(minutes: number): string {
	if (minutes < MINUTES_IN_HOUR) return `${minutes} min`;

	const hours = Math.floor(minutes / MINUTES_IN_HOUR);
	const remainder = String(minutes % MINUTES_IN_HOUR).padStart(2, "0");
	return `${hours} h ${remainder}`;
}
