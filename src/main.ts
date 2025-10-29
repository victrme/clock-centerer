import { CharacterSizer } from "./CharacterSizer";
import { Clock } from "./Clock";

const basicClock = new Clock();
const centeredClock = new Clock();
const charSizer = new CharacterSizer("1234567890:");

charSizer.calculate();
const numberAverage = charSizer.averageOf("1234567890");

const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const domClock = document.querySelector<HTMLElement>("#basic-clock")!;
const domCentered = document.querySelector<HTMLElement>("#centered-clock")!;

domClock.append(basicClock.getContainer());
domCentered.append(centeredClock.getContainer());
textarea.value = JSON.stringify(charSizer.sizes, null, 2);

basicClock.start();
centeredClock.start(resizeOnMinutesAndTens);

/**
 * Number "1" is really different than other numbers.
 * This changes the clock size every minutes AND between
 * 10 and 19 seconds
 */
function resizeOnMinutesAndTens() {
	const text = domCentered.textContent ?? "";
	const seconds = text.slice(6);
	const isTens = seconds.startsWith("1");
	let size = "";

	if (isTens) {
		const hhmms = text.slice(0, 7);
		const hhmmsSize = charSizer.sizeOf(hhmms);
		size = `${hhmmsSize + numberAverage}`;
	} else {
		const hhmm = text.slice(0, 6);
		const hhmmSize = charSizer.sizeOf(hhmm);
		const ssSize = numberAverage * 2;
		size = `${hhmmSize + ssSize}`;
	}

	domCentered.style.width = `${size}ch`;
}
