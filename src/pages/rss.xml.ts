import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { name } from "../scripts/data";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
	const posts = await getCollection("posts");
	return rss({
		title: `${name}'s Posts`,
		description: `The videos and posts made by ${name}`,
		site: context.site + "",
		customData: "<language>en-uk</language",
		items: posts
			.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
			.map((post) => ({
				...post.data,
				customData:
					(post.data.customData ?? "") +
					`<editDate>${
						post.data.editDate?.toUTCString() ?? post.data.pubDate.toUTCString()
					}</editDate>`,
				link: `/posts/${post.slug}`,
			}))
			.filter((v) => !v.draft),
	});
}
