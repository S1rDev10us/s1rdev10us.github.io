import moment from "moment";
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
		this.#callback = setInterval(this.updateTime.bind(this), 60000, undefined);
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

		this.innerText = moment(new Date(+d)).fromNow().replaceAll(" ", "\xa0");
	}
}
customElements.define("time-counter", TimeCountdown);
