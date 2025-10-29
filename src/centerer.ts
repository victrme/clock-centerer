export class CharacterSizer {
	private _sizes: Record<string, number> = {};
	private _family = "system-ui";
	private _chars: string[] = ["0"];

	/**
	 * CharacterSizer finds the size of any characters compared to zero (0).
	 * This can be useful for precise fixed width content using the "ch" unit.
	 *
	 * Calculating widths is compute-heavy, around 1ms per 20 characters.
	 * Avoid sizing the whole unicode range!
	 */
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

	/**
	 * This stores character sizes compared to "0".
	 * Beware, this method is compute-heavy.
	 */
	public calculate(): void {
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

	/**
	 * Returns the size in "ch" of a specified string.
	 * Characters present in string but not calculated will be considered "1ch"
	 */
	public sizeOf(str: string): number {
		const chars = str.split("");
		let size = 0;

		for (const char of chars) {
			size += this._sizes[char] ?? 1;
		}

		return size;
	}

	/**
	 * This gives the average ratio of all calculated characters.
	 */
	public average(): number {
		const ratios = Object.values(this._sizes);
		const sum = ratios.reduce((a, b) => a + b);
		const average = sum / ratios.length;
		return average;
	}

	/**
	 * This gives the average ratio of specified characters.
	 */
	public averageOf(str: string): number {
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
