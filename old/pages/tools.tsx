import { capitaliseWords } from "../lib";
import { tools } from "../data";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export function ToolsPage() {
	return (
		<>
			<h1>The tools that I use</h1>
			<Container>
				<Row xs="auto">
					{tools.map((v, i) => (
						<div key={i}>
							<Card style={{ width: "18rem", marginLeft: "0.75rem", marginTop: "0.75rem" }}>
								<Card.Header>
									<Card.Title>{capitaliseWords(v.name)}</Card.Title>
								</Card.Header>
								<Card.Body>
									<Card.Text>{v.description}</Card.Text>
									<Button href={v.link}>View More</Button>
								</Card.Body>
							</Card>
						</div>
					))}
				</Row>
			</Container>
		</>
	);
}
