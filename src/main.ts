import { Centerer } from "./centerer";
import { Clock } from "./clock";

const basicClock = new Clock();
const centeredClock = new Clock();
const centerer = new Centerer("1234567890:");

centerer.load();

const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const domBasicClock = document.querySelector<HTMLElement>("#basic-clock")!;
const domCenteredClock = document.querySelector<HTMLElement>(
	"#centered-clock",
)!;

domBasicClock.append(basicClock.getContainer());
domCenteredClock.append(centeredClock.getContainer());
textarea.value = JSON.stringify(centerer.sizes, null, 2);

basicClock.start();

centeredClock.start(() => {
	const text = domCenteredClock.textContent ?? "";
	const hoursMinutes = text.slice(0, text.length - 2);
	const hoursMinutesSize = centerer.size(hoursMinutes);
	const secondsSize = centerer.average("1234567890") * 2;

	domCenteredClock.style.width = `${hoursMinutesSize + secondsSize}ch`;
});
