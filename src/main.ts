import { CharacterSizer } from "./centerer";
import { Clock } from "./clock";

const basicClock = new Clock();
const centeredClock = new Clock();
const charSizer = new CharacterSizer("1234567890:");

charSizer.calculate();

const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const domBasicClock = document.querySelector<HTMLElement>("#basic-clock")!;
const domCenteredClock = document.querySelector<HTMLElement>(
	"#centered-clock",
)!;

domBasicClock.append(basicClock.getContainer());
domCenteredClock.append(centeredClock.getContainer());
textarea.value = JSON.stringify(charSizer.sizes, null, 2);

basicClock.start();

centeredClock.start(() => {
	const text = domCenteredClock.textContent ?? "";
	const hoursMinutes = text.slice(0, text.length - 2);
	const hoursMinutesSize = charSizer.sizeOf(hoursMinutes);
	const secondsSize = charSizer.averageOf("1234567890") * 2;

	domCenteredClock.style.width = `${hoursMinutesSize + secondsSize}ch`;
});
