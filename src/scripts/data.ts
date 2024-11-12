import { type CollectionEntry, getCollection } from "astro:content";
import { Theme } from "./themes";
import os from "os";
import { range } from "./lib";
import type { iconName } from "../components/Icon";

export async function getPostCollectionLength() {
	return Math.ceil((await getPosts()).length / postListNumber);
}

export const paths: { name: string; path: string }[] = [
	{ name: "About\xa0me", path: "/" },
	{ name: "My\xa0creations", path: "/creations" },
	{ name: "Posts", path: "/posts/1/" },
	{ name: "Respect", path: "/respect" },

	// { name: "Tools\xa0I\xa0Use", path: "/tools" },// I'm not sure what I want to do with this page atm
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

export const name = "S1rDev10us";

export const socials: {
	name: string;
	icon: iconName;
	href: string;
	isContact?: boolean;
}[] = [
	{
		name: "Youtube",
		icon: "youtube",
		href: "https://www.youtube.com/@S1rDev10us",
	},
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
	// TODO: actually integrate this with google APIs
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
			value: (await getPosts()).filter((v) => v.data.isVideo).length,
			name: "Videos",
		},
		{
			value: 2,
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

// export function getRecommendations(): {
// 	name: string;
// 	link: string;
// 	category: string;
// 	icon?: iconName;
// }[] {
// 	return [
// 		{
// 			name: "Outer Wilds",
// 			icon: "controller",
// 			link: "https://store.steampowered.com/app/753640/Outer_Wilds/",
// 			category: "games",
// 		},
// 		{
// 			name: "My Games",
// 			icon: "controller",
// 			link: "/creations",
// 			category: "games",
// 		},
// 		{
// 			name: "The Cosmere",
// 			icon: "book-half",
// 			link: "https://www.brandonsanderson.com/hello-my-names-brandon/",
// 			category: "books",
// 		},
// 		{
// 			name: "Sebastian Lague",
// 			icon: "youtube",
// 			link: "https://www.youtube.com/@SebastianLague",
// 			category: "game design and development",
// 		},
// 		{
// 			name: "aarthificial",
// 			icon: "youtube",
// 			link: "https://www.youtube.com/@aarthificial",
// 			category: "game design and development",
// 		},
// 		{
// 			name: "GMTK",
// 			icon: "youtube",
// 			link: "https://www.youtube.com/@GMTK",
// 			category: "game design and development",
// 		},
// 		{
// 			name: "tessel8r",
// 			icon: "youtube",
// 			link: "https://www.youtube.com/@t3ssel8r",
// 			category: "game design and development",
// 		},
// 	];
// }
