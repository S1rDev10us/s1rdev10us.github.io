import { useLocation } from 'react-router-dom'
import './components.css'
import { useEffect } from 'react';
export default function Navbar() {
	const location = useLocation();
	useEffect(() => {
		const currentLoc = document.location.hash == "" ? "#" : document.location.hash;

		for (const e of document.querySelectorAll('#navbar>*')) {
			if (e.hasAttribute('data-location')) {
				const loc = e.getAttribute('data-location') ?? "#/404";
				e.setAttribute('href', loc);
				e.classList[loc == currentLoc ? 'add' : 'remove']('navbar-selected')
			}
		}
	}, [location])
	return (<>
		<div id='navbar'>
			<a data-location="#" href={'#'}>
				S1r&nbsp;Dev10us
			</a>
			<a data-location="#/games">
				Games
			</a>

		</div>
	</>)
}