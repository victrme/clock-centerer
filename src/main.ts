import { getStringSize, numberSizer } from "./centerer.ts";
import { createClock } from "./clock.ts";
import "./style.css";

const basicClock = createClock();
const centeredClock = createClock();
const centerer = numberSizer();

const textarea = document.querySelector<HTMLTextAreaElement>("textarea")!;
const domBasicClock = document.querySelector<HTMLElement>("#basic-clock")!;
const domCenteredClock = document.querySelector<HTMLElement>(
	"#centered-clock",
)!;

domBasicClock.append(basicClock);
domCenteredClock.append(centeredClock);
textarea.value = JSON.stringify(centerer, null, 2);

setInterval(() => {
	const text = domCenteredClock.textContent;
	const hhmm = text.slice(0, text.length - 2);
	const hhmmSize = getStringSize(hhmm, centerer.list);
	const ssSize = centerer.averageNumber * 2;

	domCenteredClock.style.width = `${hhmmSize + ssSize}ch`;
}, 1000);
