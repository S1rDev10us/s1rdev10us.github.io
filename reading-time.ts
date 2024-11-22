import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
export const remarkReadingTime: RemarkPlugin = function () {
	return function (tree: unknown, { data }: any) {
		const textOnPage = toString(tree);
		const readingTime = getReadingTime(textOnPage);

		(<any>data.astro).frontmatter.minutesRead = readingTime;
	};
};
