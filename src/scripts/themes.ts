declare global {
	interface Window {
		hideThemes: (theme?: Theme | null) => void;
	}
}
export enum Theme {
	LIGHT = "light",
	DARK = "dark",
	AUTO = "auto",
}

// tests if global scope is bound to window
if (new Function("try {return this===window;}catch(e){ return false;}")())
	(() => {
		const darkMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");
		const lightMatchMedia = window.matchMedia("(prefers-color-scheme: light)");
		var currentTheme = (localStorage.getItem("theme") as Theme) ?? Theme.AUTO;

		darkMatchMedia.onchange = () => setTheme();
		lightMatchMedia.onchange = () => setTheme();

		setTheme();
		function resolveTheme(theme?: Theme | null): Theme {
			if (!theme) return resolveTheme(currentTheme);
			return theme == Theme.AUTO
				? darkMatchMedia.matches
					? Theme.DARK
					: Theme.LIGHT
				: theme;
		}
		function setTheme(theme?: Theme | null): void {
			if (!theme) return setTheme(currentTheme);
			currentTheme = theme;
			localStorage.setItem("theme", theme);
			document.documentElement.setAttribute("data-bs-theme", resolveTheme());

			document.querySelectorAll(".theme-toggler").forEach((e) => {
				(e as HTMLElement).style.display = e.classList.contains(
					`theme-toggler-${theme}`
				)
					? "inherit"
					: "none";
				// [
				// 	!e.classList.contains(`theme-toggler-${theme}`) ? "add" : "remove"
				// ]("theme-toggler-inactive");
			});
			document.querySelectorAll(".theme-toggler-choice").forEach((e) => {
				e.classList[
					e.classList.contains(`theme-toggler-choice-${theme}`)
						? "add"
						: "remove"
				]("active");
			});
		}
		window.hideThemes = setTheme;
	})();
