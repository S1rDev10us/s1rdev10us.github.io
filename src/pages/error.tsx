import title from "../main";

export default function Error() {
	console.log(404)
	
	title("404");

	return (<h1>PAGE NOT FOUND</h1>)
}