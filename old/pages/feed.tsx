import { feed } from "../data";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import { FeedVideoCard } from "../components/feed/FeedVideoCard";
import { FeedPostCard } from "../components/feed/FeedPostCard";

export default function FeedPage() {
	return (
		<Container fluid>
			<h1>My feed</h1>
			<Row>
				<Col md="auto">
					<Accordion defaultActiveKey="0">
						<Accordion.Item eventKey="0">
							<Accordion.Header>Recent posts</Accordion.Header>
							<Accordion.Body>
								<Nav className="flex-column">
									{feed.map((v, i) => (
										<Nav.Link
											key={i}
											onClick={() => {
												// /*window.scrollTo({ top: */ document
												// 	.getElementById(i + "")!
												// 	.scrollIntoView({ behavior: "instant" });
												// window.scrollBy({ top: document.getElementById(i + "")!.offsetTop }); /*.top /* - 50/ })*/
												let node = document.getElementById(i + "")!;
												node.setAttribute("tabindex", "-1");

												node.focus();

												node.removeAttribute("tabindex");
											}}
										>
											{v.title}
										</Nav.Link>
									))}
								</Nav>
							</Accordion.Body>
						</Accordion.Item>
					</Accordion>
				</Col>
				<Col md={true}>
					<Stack gap={3}>
						{(feed as feedItem[]).map((v, i) => {
							if (v.date > Number(new Date())) return undefined;
							switch (v.type) {
								case "video":
									return (
										<div
											id={i + ""}
											key={i}
										>
											<FeedVideoCard video={v} />
										</div>
									);
								case "post":
									return (
										<div
											id={i + ""}
											key={i}
										>
											<FeedPostCard post={v} />
										</div>
									);
								default:
									return undefined;
							}
						})}
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
