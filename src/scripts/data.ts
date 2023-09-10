import { CollectionEntry, getCollection } from "astro:content";
import { Theme } from "./themes";
import os from "os";
import { range } from "../lib";
import type { iconName } from "../components/Icon";

export async function getPostCollectionLength() {
	return Math.ceil(
		(await getPosts()).length / postListNumber
		// 500 / postListNumber
	);
}
// // @ts-expect-error
// var secrets: {
// 	youtube?: {
// 		channelId: string;
// 	};
// };
// //ensure secrets are never sent to client if I use data client side
// if (!new Function("try {return this===window;}catch(e){ return false;}")()) {
// 	secrets = JSON.parse(fs.readFileSync("./secret.json").toString());
// }

export const paths: { name: string; path: string }[] = [
	{ name: "About\xa0me", path: "/" },
	{ name: "My\xa0creations", path: "/creations" },
	{ name: "Posts", path: "/posts" },
	{ name: "Tools\xa0I\xa0Use", path: "/tools" },
	// { name: "my\xa0journey", path: "/journey" },
];

export const themes: { icon: iconName; id: Theme; desc: string }[] = [
	{
		icon: "circle-half",
		id: Theme.AUTO,
		desc: "Auto",
	},
	{
		icon: "moon-stars-fill",
		id: Theme.DARK,
		desc: "Dark Mode",
	},
	{
		icon: "brightness-high-fill",
		id: Theme.LIGHT,
		desc: "Light Mode",
	},
];

export const creativeMediums: {
	tabName: string;
	id: string;
	bodyText: string;
}[] = [
	{
		tabName: "Game Dev",
		id: "games",
		bodyText:
			"This is my passion and my main job which is mainly funded by my devlogs and patreon",
	},
	{
		tabName: "Youtube Devlogs",
		id: "videos",
		bodyText:
			"This helps me visualize my ideas, fund my game creation and show my work to the world",
	},
	{
		tabName: "Pixel art",
		id: "pixel-art",
		bodyText: "I do art both for games and for fun ",
	},
	{
		tabName: "Website Design",
		id: "websites",
		bodyText:
			"I created this website myself, using Astro and bootstrap.\nIt went through a few iterations, including a basic design using no libraries and a more advanced design using react.",
	},
	{
		tabName: "Discord Bots",
		id: "discord-bots",
		bodyText:
			"I have created numerous discord bots over the years for various purposes, mostly with discord.js and node.",
	},
];

export const name = "S1rDev10us";

export const socials: {
	name: string;
	icon: iconName;
	href: string;
	isContact?: boolean;
}[] = [
	{
		name: "Discord",
		icon: "discord",
		href: "/discord",
	},
	{
		name: "Github",
		icon: "github",
		href: "https://github.com/S1rDev10us",
	},
	{
		name: "RSS Feed",
		icon: "rss",
		href: "/rss.xml",
	},
];

export const postListNumber = 10;
export async function getPosts(): Promise<CollectionEntry<"posts">[]> {
	var posts: CollectionEntry<"posts">[];
	const test = false;
	if (test && import.meta.env.DEV) {
		let render = (await getCollection("posts"))[0]!.render;
		posts = //(await getCollection("posts"))
			range(50).map(
				(): CollectionEntry<"posts"> => ({
					body: "",
					collection: "posts",
					data: {
						editDate: new Date(),
						isVideo: false,
						pubDate: new Date(),
						title: "Test",
					},
					id: "blog/website-release.md",
					render,
					slug: "blog/website-release",
				})
			);
	} else {
		posts = await getCollection("posts");
	}
	const draftsInDevMode = true;
	posts = posts
		.map((v) => {
			if (v.slug.startsWith("/test/")) {
				v.data.draft = true;
			}
			return v;
		})
		.filter((v) => !v.data.draft || (import.meta.env.DEV && draftsInDevMode))
		.sort((a, b) => +b.data.pubDate - +a.data.pubDate);
	return posts;
}
export async function getCreations(): Promise<CollectionEntry<"creations">[]> {
	const creations = (await getCollection("creations")).sort(
		(a, b) => +b.data.released - +a.data.released
	);
	return creations;
}

export async function getStats(): Promise<{ value: any; name: string }[]> {
	// const data = await (
	// 	await fetch(
	// 		`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${secrets.youtube.channelId}&key=`
	// 	)
	// ).json();
	// console.log(JSON.stringify(data));
	return [
		{
			value: (await getPosts()).length,
			name: "Posts",
		},
		{
			value: (await getCollection("posts")).filter((v) => v.data.isVideo)
				.length,
			name: "Videos",
		},
		{
			value: 0,
			name: "Subscribers",
		},
		{
			value: 0,
			name: "Views",
		},
	];
}

export function isOnline(): boolean {
	return Object.values(os.networkInterfaces())
		.flat()
		.some((v) => !(v ?? { internal: true }).internal);
}

export async function getHobbies(): Promise<
	(string | { name: string; url?: string; emoji?: iconName })[]
> {
	return [
		{
			emoji: "heart-arrow",
			name: "Archery",
		},
		{
			emoji: "keyboard",
			name: "Coding",
			url: "/creations",
		},
		{
			// emoji: "🛠️🎮",
			emoji: "tools",
			// emoji: "🎮",
			name: "Games design",
			url: "/creations",
		},
		{
			emoji: "book-half",
			name: "Reading",
		},
		{
			emoji: "controller",
			name: "Playing games",
		},
	];
}

export function getRecommendations(): {
	name: string;
	link: string;
	icon?: iconName;
}[] {
	return [
		{
			name: "Outer Wilds",
			icon: "controller",
			link: "https://store.steampowered.com/app/753640/Outer_Wilds/",
		},
		{
			name: "My Games",
			icon: "controller",
			link: "/creations",
		},
		{
			name: "The Cosmere",
			icon: "book-half",
			link: "https://www.brandonsanderson.com/hello-my-names-brandon/",
		},
		{
			name: "Sebastian Lague",
			icon: "youtube",
			link: "https://www.youtube.com/@SebastianLague",
		},
		{
			name: "aarthificial",
			icon: "youtube",
			link: "https://www.youtube.com/@aarthificial",
		},
		{
			name: "GMTK",
			icon: "youtube",
			link: "https://www.youtube.com/@GMTK",
		},
		{
			name: "tessel8r",
			icon: "youtube",
			link: "https://www.youtube.com/@t3ssel8r",
		},
	];
}
