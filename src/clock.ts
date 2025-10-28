export function createClock(): HTMLElement {
	const dom_hh_separator = document.createElement("span");
	const dom_mm_separator = document.createElement("span");
	const container = document.createElement("div");
	const dom_hh = document.createElement("span");
	const dom_mm = document.createElement("span");
	const dom_ss = document.createElement("span");

	dom_hh.textContent = "00";
	dom_mm.textContent = "00";
	dom_ss.textContent = "00";
	dom_hh_separator.textContent = ":";
	dom_mm_separator.textContent = ":";

	container.append(
		dom_hh,
		dom_hh_separator,
		dom_mm,
		dom_mm_separator,
		dom_ss,
	);

	const date = new Date();
	const h = date.getHours();
	const m = date.getMinutes();
	const s = date.getSeconds();

	dom_hh.textContent = addLeadingZero(h);
	dom_mm.textContent = addLeadingZero(m);
	dom_ss.textContent = addLeadingZero(s);

	setInterval(() => {
		const date = new Date();
		const h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();

		dom_hh.textContent = addLeadingZero(h);
		dom_mm.textContent = addLeadingZero(m);
		dom_ss.textContent = addLeadingZero(s);
	}, 1000);

	return container;
}

function addLeadingZero(n: number): string {
	return n.toString().length === 1 ? `0${n}` : n.toString();
}
