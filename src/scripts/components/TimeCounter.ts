import moment from "moment";
export function stringFromDate(
	date: Date,
	pastText: string = "Released",
	futureText: string = "Releases",
) {
	let onServer = import.meta.env.SSR;
	let momentDate = moment(date);

	let dateInFuture = moment().isBefore(momentDate);
	let prefix = dateInFuture ? futureText : pastText;

	return `${prefix}\xa0${
		onServer ? "~" : ""
	}${momentDate.fromNow().replaceAll(" ", "\xa0")}`;
}

if (!import.meta.env.SSR) {
	class TimeCountdown extends HTMLElement {
		#callback?: number | undefined;

		constructor() {
			super();
			this.updateTime();
			this.connectedCallback();
		}
		connectedCallback() {
			if (this.#callback) {
				clearInterval(this.#callback);
				this.#callback = undefined;
			}
			this.#callback = setInterval(
				this.updateTime.bind(this),
				60000,
				undefined,
			);
		}
		disconnectedCallback() {
			clearInterval(this.#callback);
			this.#callback = undefined;
		}
		attributeChangedCallback() {
			this.updateTime();
		}
		static get observedAttributes() {
			return ["data-date"];
		}
		updateTime() {
			const d = this.dataset.date;
			if (!d) return;

			this.innerText = stringFromDate(
				new Date(isNaN(+d) ? d : +d),
				this.dataset.pastText,
				this.dataset.futureText,
			);
		}
	}
	customElements.define("time-counter", TimeCountdown);
}
