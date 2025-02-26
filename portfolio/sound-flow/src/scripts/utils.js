export function timeFormating(time) {
	const min = Math.floor(time / 60);
	const sec = Math.floor(time) % 60;

	return min + ':' + (sec < 10 ? '0' + sec : sec);
}


export function clamp(value, min = 0, max = 1) {
	return Math.min(Math.max(value, min), max);
}


export function preloadImage(src) {
	const img = new Image().src = src;
}