import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {name} from './data.json';
import Navbar from './components/navbar';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Navbar/>
		<App />
	</React.StrictMode>,
)
export default function title(pageTitle:string){
	document.title=name+" - "+pageTitle;
}
