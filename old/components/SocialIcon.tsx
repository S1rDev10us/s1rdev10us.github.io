import { videoSiteIconClasses, videoSiteImageUrls } from "../data";
import { capitaliseWords } from "../lib";
import Image from "react-bootstrap/Image";

export function SocialIcon(props: { social: string }) {
	const social = props.social;
	return (
		<>
			{social in videoSiteIconClasses ? (
				<i className={`bi ${videoSiteIconClasses[social]}`} />
			) : social in videoSiteImageUrls ? (
				<Image
					height={"25px"}
					src={videoSiteImageUrls[social]}
					rounded
				/>
			) : (
				capitaliseWords(social.replace("_", " ")) + " "
			)}
		</>
	);
}
