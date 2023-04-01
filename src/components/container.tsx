import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react'
import './components.css'

export default function Container(container:{children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined}){
	return <div className="container">

		{container.children}
	</div>
}