import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { remarkReadingTime } from "./reading-time";

// https://astro.build/config
export default defineConfig({
	integrations: [react(), mdx(), sitemap()],
	site: "https://s1rdev10us.github.io",
	redirects: {
		"/posts": "/posts/1",
		"/posts/": "/posts/1",
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
});
