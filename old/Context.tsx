import { Context, createContext } from "react";

export enum Themes {
	LIGHT = "light",
	DARK = "dark",
	AUTO = "auto",
}
export const ThemeContext = createContext({
	state: Themes.LIGHT,
	set: (theme: Themes) => {},
});
