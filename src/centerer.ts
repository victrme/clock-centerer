interface Centerer {
	list: List;
	family: string;
	averageAll: number;
	averageNumber: number;
}

type List = Record<string, number>;

export function numberSizer(): Centerer {
	const container = document.createElement("div");
	const sizes: List = {};

	const centerer: Centerer = {
		list: {},
		family: "",
		averageAll: 0,
		averageNumber: 0,
	};

	const numbers = "0123456789".split("");
	const chars = "0123456789:-/,".split("");
	const spans = [];
	let zeroWidth = 0;

	// 1. Create spans in document

	for (const char of chars) {
		const span = document.createElement("span");
		span.textContent = char;
		span.style.all = "unset";
		spans.push(span);
	}

	container.append(...spans);
	container.style.position = "absolute";
	container.style.visibility = "hidden";
	document.body.append(container);

	// 2. Get sizes, then compare them to "0". 2 decimals

	for (const span of spans) {
		const char = span.textContent;
		const width = span.getBoundingClientRect().width;

		if (char === "0") {
			sizes["0"] = 1;
			zeroWidth = width;
			continue;
		}

		sizes[char] = Math.round((width / zeroWidth) * 100) / 100;
	}

	container.remove();

	// 3. Tie found sizes to current font-family
	// 	  Add more data like averages

	const vals = Object.values(sizes);
	const averageAll = vals.reduce((a, b) => a + b) / chars.length;

	centerer.family = globalThis.getComputedStyle(container).fontFamily;
	centerer.family = centerer.family.split(", ")[0];

	centerer.list = sizes;

	numbers.forEach((num) => {
		centerer.averageNumber += sizes[num] / 10;
	});

	centerer.averageAll = averageAll;

	// 4. Return found data

	return centerer;
}

/**
 * Returns clock size in "ch"
 */
export function getStringSize(str: string, sizes: List): number {
	const chars = str.split("");
	let size = 0;

	for (const char of chars) {
		size += sizes[char] ?? 0;
	}

	return size;
}
