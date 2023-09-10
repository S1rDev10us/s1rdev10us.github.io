import { Navigate, Route, RouterProvider, createHashRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./pages/home";
import PageNotFound from "./pages/errors/pageNotFound";
import Spinner from "react-bootstrap/Spinner";
import FeedPage from "./pages/feed";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { ThemeContext, Themes } from "./Context";
import Overlay from "./components/Overlay";
import { WorksPage } from "./pages/works";
import { resolveTheme } from "./lib";
import { Work } from "./pages/subPages/work";
import { ToolsPage } from "./pages/tools";
import { SocialPage } from "./pages/socials";

export const home = "about";

const router = createHashRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<Overlay />}
		>
			<Route
				index
				element={
					<Navigate
						to={`/${home}`}
						replace
					/>
				}
			/>
			<Route
				path={home}
				// index
				Component={HomePage}
			/>
			<Route
				path="tools"
				// index
				Component={ToolsPage}
			/>
			<Route
				path="socials"
				// index
				Component={SocialPage}
			/>
			<Route path="works/">
				<Route
					index
					Component={WorksPage}
				/>
				<Route
					path=":workId"
					Component={Work}
				/>
			</Route>
			<Route path="posts/">
				<Route
					index
					Component={FeedPage}
				/>
				{/* <Route
					path=":gameId"
					Component={Game}
				/> */}
			</Route>
			<Route
				path="*"
				Component={PageNotFound}
			/>
		</Route>
	)
);

export default function App() {
	const [theme, setTheme] = useState<Themes>((localStorage.getItem("theme") as Themes) ?? Themes.AUTO);
	useEffect(() => {
		document.documentElement.setAttribute("data-bs-theme", resolveTheme(theme));
		localStorage.setItem("theme", theme);
	}, [theme]);
	return (
		<>
			<ThemeContext.Provider value={{ state: theme, set: setTheme }}>
				<Container>
					<RouterProvider
						router={router}
						fallbackElement={<Spinner animation="border" />}
					/>
				</Container>
			</ThemeContext.Provider>
		</>
	);
}
