import { rssSchema } from "@astrojs/rss";
import { defineCollection } from "astro:content";
import { z } from "astro:content";

const preTransformPostScheme = rssSchema.extend({
	isVideo: z.boolean().default(false),
	thumbnail: z.string().url().optional(),
	editDate: rssSchema.shape.pubDate.optional(),
	draft: z.boolean().optional(),
});
export const postScheme = preTransformPostScheme.transform((val) => {
	if (!val.editDate) {
		val.editDate = val.pubDate;
	}
	return val;
});

const posts = defineCollection({
	type: "content",
	schema: postScheme,
});
const socials = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
	}),
});
const creations = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		externalLinks: z
			.object({
				url: z.string(),
				title: z.string(),
			})
			.array()
			.optional(),
		released: rssSchema.shape.pubDate,
	}),
});
// const tools = defineCollection({
// 	type: "content",
// 	schema: z
// 		.object({
// 			thumbnail: z.string(),
// 			svgThumbnail: z.boolean().optional(),
// 			externalLinks: z
// 				.object({
// 					url: z.string().url(),
// 					title: z.string(),
// 				})
// 				.array()
// 				.optional(),
// 			externalLink: z
// 				.object({
// 					url: z.string().url(),
// 					title: z.string(),
// 				})
// 				.optional(),
// 		})
// 		.strict(),
// });
export const collections = {
	posts,
	socials,
	creations,
	// tools,
};
