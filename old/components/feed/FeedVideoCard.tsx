import Button from "react-bootstrap/Button";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { SocialIcon } from "../SocialIcon";
import { capitaliseWords } from "../../lib";

export function FeedVideoCard(props: { video: videoData }) {
	const video = props.video;
	return (
		<div>
			<Card style={{ width: "25rem" }}>
				<Card.Img
					variant="top"
					src={video.thumbnail}
				/>
				<Card.Header>
					<Card.Title>{capitaliseWords(video.title)}</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text>{video.description}</Card.Text>
					<ButtonGroup>
						{Object.keys(video.links).map((v, i) =>
							v != undefined ? (
								<Button
									key={i}
									href={video.links[v]}
								>
									<SocialIcon social={v} />
								</Button>
							) : undefined
						)}
					</ButtonGroup>
				</Card.Body>
				<Card.Footer className="text-center text-muted">{new Date(video.date).toUTCString()}</Card.Footer>
			</Card>
		</div>
	);
}
