export class Clock {
	private dom_hh_separator = document.createElement("span");
	private dom_mm_separator = document.createElement("span");
	private container = document.createElement("div");
	private dom_hh = document.createElement("span");
	private dom_mm = document.createElement("span");
	private dom_ss = document.createElement("span");

	constructor() {
		this.dom_hh.textContent = "00";
		this.dom_mm.textContent = "00";
		this.dom_ss.textContent = "00";
		this.dom_hh_separator.textContent = ":";
		this.dom_mm_separator.textContent = ":";

		this.container.append(
			this.dom_hh,
			this.dom_hh_separator,
			this.dom_mm,
			this.dom_mm_separator,
			this.dom_ss,
		);
	}

	public getContainer(): HTMLElement {
		return this.container;
	}

	public start(callback?: () => void): void {
		const date = new Date();
		this.update(date);

		if (callback) {
			callback();
		}

		setInterval(() => {
			const date = new Date();
			this.update(date);

			if (callback) {
				callback();
			}
		}, 1000);
	}

	private update(date: Date) {
		const h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();

		this.dom_hh.textContent = this.addLeadingZero(h);
		this.dom_mm.textContent = this.addLeadingZero(m);
		this.dom_ss.textContent = this.addLeadingZero(s);
	}

	private addLeadingZero(n: number): string {
		return n.toString().length === 1 ? `0${n}` : n.toString();
	}
}
