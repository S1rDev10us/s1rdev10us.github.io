import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function Div(){
	return (<div></div>)
}
function App() {
	const [count, setCount] = useState(0)
	const url=new RegExp(/(?<=#).*/gms).exec(window.document.URL);
	alert(url+"");
	switch (url+"") {
		case "hi":
			return (<h1>hello</h1>)
			break;
		case "null":
			return (<h1>Homepage</h1>)
			break;
		default:
			window.location.href=window.location.origin+"/"
			return null;
			break;
	}
  }
  
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
