import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";

export function WorkOrPostNotFound() {
	const loc = useLocation();
	const pageType = loc.pathname.split("/")[1] == "works" ? "creation" : "post";
	function generateText() {
		return `| URL: "${window.location.href}"\n| path: "${loc.pathname}"\n| previous `;
	}
	return (
		<>
			<h1>You seem to have encountered an error!</h1>
			<h3>
				The {pageType} that you have gone to does not actually exist!
				<br />
				It would be extremely helpful if you could copy this debug text and send it to S1rDev10us
				<br />
				{/* Filling out the below form will add more detail to the debug text and help fix this issue in the future */}
			</h3>
			<Button
				onClick={() => {
					navigator.clipboard.writeText(generateText());
				}}
			>
				Copy debug text
			</Button>
			{/* <Form
				onSubmit={(e) => {
					e.currentTarget.value;
				}}
				action="javascript:void(0);"
			>
				<Form.Group controlId="">
					<Form.Control type=""/>
				</Form.Group>
			</Form> */}
		</>
	);
}
