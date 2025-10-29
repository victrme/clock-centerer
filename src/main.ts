import { CharacterSizer } from "./CharacterSizer";
import { BasicClock } from "./BasicClock";

const clock = new BasicClock();
const centeredClock = new BasicClock();
const charSizer = new CharacterSizer("1234567890:");

charSizer.calculate();

const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const domClock = document.querySelector<HTMLElement>("#basic-clock")!;
const domCenteredClock = document.querySelector<HTMLElement>(
	"#centered-clock",
)!;

domClock.append(clock.getContainer());
domCenteredClock.append(centeredClock.getContainer());
textarea.value = JSON.stringify(charSizer.sizes, null, 2);

clock.start();

centeredClock.start(() => {
	const text = domCenteredClock.textContent ?? "";
	const hoursMinutes = text.slice(0, text.length - 2);
	const hoursMinutesSize = charSizer.sizeOf(hoursMinutes);
	const secondsSize = charSizer.averageOf("1234567890") * 2;

	domCenteredClock.style.width = `${hoursMinutesSize + secondsSize}ch`;
});
