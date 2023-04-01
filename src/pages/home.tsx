import title from "../main";

export default function Root() {
	console.log("root")
	title("Homepage");
	return (<div>
		<h1>Welcome to my website!</h1>
	</div>)
}