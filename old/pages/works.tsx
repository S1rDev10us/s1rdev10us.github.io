import Card from "react-bootstrap/Card";
import { works } from "../data";
import Button from "react-bootstrap/Button";

export function WorkCard(prop: { work: work }) {
	return (
		<Card
			className="text-center"
			style={{ width: "40rem" }}
		>
			<Card.Body>
				<Card.Title>{prop.work.name}</Card.Title>
				<Card.Text className="text-truncate">{prop.work.description}</Card.Text>
				<Button href={`#/works/${prop.work.id}`}>See more</Button>
			</Card.Body>
		</Card>
	);
}

export function WorksPage() {
	return (
		<>
			<h1>What I have created</h1>
			{works.map((work, i) => (
				<WorkCard
					key={i}
					work={work}
				/>
			))}
		</>
	);
}
