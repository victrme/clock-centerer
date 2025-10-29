export class Centerer {
	private _sizes: Record<string, number> = {};
	private _family = "system-ui";
	private _chars: string[] = ["0"];

	constructor(str: string) {
		str = str.replaceAll("0", "");
		this._chars.push(...str.split(""));
	}

	get sizes(): Record<string, number> {
		return this._sizes;
	}
	get family(): string {
		return this._family;
	}
	get chars(): string[] {
		return this._chars;
	}

	public load(): void {
		const container = document.createElement("div");
		const spans = [];
		let zeroWidth = 0;

		// 1. Create spans in document

		for (const char of this._chars) {
			const span = document.createElement("span");
			span.textContent = char;
			span.style.all = "unset";
			spans.push(span);
		}

		container.style.position = "absolute";
		container.style.visibility = "hidden";
		container.append(...spans);
		document.body.append(container);

		// 2. Load font family
		//    Keep it here to allow more time for container to append to body

		this._family = globalThis.getComputedStyle(document.body).fontFamily;
		this._family = this._family.split(", ")[0];

		// 3. Get sizes, then compare them to "0"
		// 	  This gives a size ratio, "0" character being 1.00ch

		for (const span of spans) {
			const char = span.textContent ?? "";
			const width = span.getBoundingClientRect().width;

			if (char === "0") {
				this._sizes["0"] = 1;
				zeroWidth = width;
				continue;
			}

			this._sizes[char] = Math.round((width / zeroWidth) * 100) / 100;
		}

		// 4. Cleanup

		container.remove();
	}

	public size(str: string): number {
		const chars = str.split("");
		let size = 0;

		for (const char of chars) {
			size += this._sizes[char] ?? 0;
		}

		return size;
	}

	public average(str?: string): number {
		if (!str) {
			const ratios = Object.values(this._sizes);
			const sum = ratios.reduce((a, b) => a + b);
			const average = sum / ratios.length;
			return average;
		}

		let foundChar = 0;
		let sum = 0;

		for (const char of str.split("")) {
			const size = this._sizes[char];

			if (size) {
				sum += size;
				foundChar++;
			}
		}

		if (foundChar === 0) {
			return 1;
		}

		return sum / foundChar;
	}
}
