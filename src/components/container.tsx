import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import './components.css'

export default function Container(container:{children:React.ReactNode}){
	return <div className="container">
		{container.children}
	</div>
}