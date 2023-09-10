interface work {
	name: string;
	description: string;
	id: string;
}
type works = work[];
interface videoData {
	type: "video";
	date: number;
	links: {
		[social: string]: string;
	};
	title: string;
	description: string;
	thumbnail?: string;
}
interface postData {
	type: "post";
	date: number;
	link: string;
	title: string;
	description: string;
}
type feedItem = videoData | postData;

interface dataObject {
	feed: feedItem[];
	works: works;
}
