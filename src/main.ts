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

centeredClock.start(() => {
	const text = domCentered.textContent ?? "";
	const hoursMinutes = text.slice(0, text.length - 2);
	const hoursMinutesSize = charSizer.sizeOf(hoursMinutes);
	const secondsSize = numberAverage * 2;

	domCentered.style.width = `${hoursMinutesSize + secondsSize}ch`;
});
