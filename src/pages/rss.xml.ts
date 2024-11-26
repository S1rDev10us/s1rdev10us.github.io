import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { name } from "../scripts/data";
import { getCollection } from "astro:content";
import { defaultReleaseDate } from "@scripts/lib";

export async function GET(context: APIContext) {
	const posts = await getCollection("posts");
	return rss({
		title: `${name}'s Posts`,
		description: `The videos and posts made by ${name}`,
		site: context.site + "",
		customData: "<language>en-uk</language",
		items: posts
			.sort(
				(a, b) =>
					defaultReleaseDate(b.data.pubDate, "posts", b.id).getTime() -
					defaultReleaseDate(a.data.pubDate, "posts", b.id).getTime(),
			)
			.map((post) => ({
				...post.data,
				customData:
					(post.data.customData ?? "") +
					`<editDate>${
						post.data.editDate?.toUTCString() ??
						defaultReleaseDate(post.data.pubDate, "posts", post.id).getTime()
					}</editDate>`,
				link: `/posts/${post.slug}`,
			}))
			.filter((v) => !v.draft),
	});
}
