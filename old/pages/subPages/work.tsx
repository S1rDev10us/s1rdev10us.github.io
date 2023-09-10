import { useParams } from "react-router-dom";
import { WorkOrPostNotFound } from "../errors/workOrPostNotFound";
import { works } from "../../data";

export function Work() {
	const urlParams = useParams();
	const potentialWorkData: work[] = (works as works).filter((work) => work.id == urlParams.workId);
	if (potentialWorkData.length == 0) return <WorkOrPostNotFound />;
	const workData = potentialWorkData[0];

	return (
		<>
			<h1>{workData.name}</h1>
			<h3>{workData.description}</h3>
		</>
	);
}
