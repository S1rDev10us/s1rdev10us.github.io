import { execSync } from "child_process";

function capitaliseWith(str: string, splitter: string) {
	return str
		.split(splitter)
		.map((word) =>
			word
				? word.length > 1
					? word[0]!.toUpperCase() + word.substring(1)
					: word.toUpperCase()
				: null,
		)
		.join(splitter);
}
export function capitaliseWords(
	str: string,
	splitter: string = " ",
	useBreakingSpace: boolean = true,
): string {
	if (useBreakingSpace && splitter == " ") {
		return capitaliseWith(capitaliseWith(str.toLowerCase(), splitter), "\xa0");
	}
	return capitaliseWith(str.toLowerCase(), splitter);
}

export function range(length: number) {
	if (length % 1 != 0)
		throw new Error(`Length should be an integer. Length was ${length}`);
	if (length < 0)
		throw new Error(`Length cannot be negative. Length was ${length}`);
	return [...new Array(length).keys()];
}
export function formatDate(date: Date) {
	const separator = "-";
	// prettier-ignore
	return [
		date.getUTCFullYear(),
		date.getUTCMonth() + 1,
		date.getUTCDate()
	].join(separator);
}

export function defaultReleaseDate(
	date: any | undefined,
	collections: string,
	id: string,
): Date {
	if (date) return new Date(date);
	return fileCommitedOn(`src/content/${collections}/${id}`);
}

export function fileCommitedOn(fileLoc: string): Date {
	const command = `git log --diff-filter=A -1 --follow --format=%ad --date default -- "${fileLoc}"`;
	const output = execSync(command).toString();
	if (output.trim() == "") {
		return new Date();
	}
	return new Date(output);
}
