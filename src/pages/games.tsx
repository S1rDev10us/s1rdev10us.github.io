import games from '../games.json';
import Container from '../components/container';
import title from '../main';
function Game(game:{name:string,description:string,imageURL?:string}) {
	return <Container>
		{game.name}
		<br/>
		{game.description}
	</Container>
};
export default function Games() {
	title("Games");
	return (<>
		{games.map((e) => <Game name={e.name} description={e.description}/>)}
	</>)
}