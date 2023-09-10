import { useContext } from "react";
import { ThemeContext, Themes } from "./Context";

export function typeData(data: dataObject) {
	return data;
}

export function capitaliseWords(str: string) {
	return str
		.toLowerCase()
		.split(" ")
		.map((word) => (word ? word[0].toUpperCase() + word.substring(1) : null))
		?.join(" ");
}

export function resolveTheme(theme?: Themes) {
	if (theme === undefined) {
		return resolveTheme(useContext(ThemeContext).state);
	}
	if (theme != Themes.AUTO) return theme;

	return (window.matchMedia("(prefers-color-scheme: dark)").matches ? Themes.DARK : Themes.LIGHT) as Themes;
}

export function range(length: number) {
	return [...Array(length).keys()];
}
