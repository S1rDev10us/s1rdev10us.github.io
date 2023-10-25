import type { APIRoute, GetStaticPaths } from "astro";
import svg from "../assets/grain-base.svg?raw";
export const GET: APIRoute = ({ params }) => {
	return new Response(
		svg.replace(
			"baseFrequency='1'",
			`baseFrequency='${params.frequency?.replace("-", ".")}'`
		),
		{
			headers: [["content-type", "image/svg+xml"]],
		}
	);
};
const scales = [1.25, 1, 5, 0.25, 2];
export function getStaticPaths(): ReturnType<GetStaticPaths> {
	let newScales = scales.map((v) => ({
		params: { frequency: v.toString().replace(".", "-") },
	}));
	return newScales;
}
