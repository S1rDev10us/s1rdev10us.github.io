import { range, typeData } from "./lib";
export const videoSiteImageUrls: { [key: string]: string } = {};
export const videoSiteIconClasses: { [key: string]: string } = {
	youtube: "bi-youtube",
	twitch: "bi-twitch",
	reddit: "bi-reddit",
	github: "bi-github",
	discord: "bi-discord",
};
export const tools: { name: string; link: string; description: string }[] = [
	{
		name: "Motion Canvas",
		link: "https://motioncanvas.io/",
		description: "A TypeScript library for creating animated videos using the Canvas API",
	},
	{ name: "Unity", link: "https://unity.com/", description: "A game engine that uses c#" },
	{
		name: "Visual Studio",
		link: "https://visualstudio.microsoft.com/",
		description: "The most comprehensive IDE for .NET and C++ developers on Windows.",
	},
	{
		name: "Visual Studio Code",
		description:
			"Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications.",
		link: "https://code.visualstudio.com/",
	},
	...range(9).map((i) => ({
		name: "Tool#" + (i + 1 + 3),
		description: "The description for the tool that I used",
		link: "",
	})),
];

export const feed: feedItem[] = [
	// {
	// 	date: 1687358291291,
	// 	links: {
	// 		youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	// 		twitch: "",
	// 		"not Youtube": "",
	// 	},
	// 	title: "Never gonna give you up",
	// 	description: "A video of a song by Rick Astley",
	// 	thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg",
	// },

	...range(150).map<feedItem>((i) => ({
		type: "video",
		date: 1687380038499,
		links: {
			youtube: "",
			twitch: "",
			discord: "",
			github: "",
			reddit: "",
			view_here: "",
		},
		title: `Video#${150 - i}`,
		description: "Lorem ipsum dolor sit amet",
	})),
	{
		type: "video",
		date: 1687380038499,
		links: {
			youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
		},
		title: "My First video",
		description: "The first video that I certainly made",
	},
];
export const works: work[] = [
	{
		id: "cuddly_computing_machine",
		name: "Cuddly Computing Machine",
		description: "A text based game built in python that procedurally builds an adventure based on json",
	},
];
