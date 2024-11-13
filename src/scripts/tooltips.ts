import { Tooltip } from "bootstrap";
const tooltipTriggerList = document.querySelectorAll(
	'[data-bs-toggle="tooltip"]'
);
for (let i = 0; i < tooltipTriggerList.length; i++) {
	const tooltipTriggerElem = tooltipTriggerList[i]!;
	new Tooltip(tooltipTriggerElem);
}
