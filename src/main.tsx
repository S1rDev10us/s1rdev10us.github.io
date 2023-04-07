import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {name} from './data.json';
import Navbar from './components/navbar';
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Games from './pages/games';
import Home from './pages/home';
import Error from './pages/error'
import App from './App';

const router = createHashRouter(createRoutesFromElements(
	<Route path='/'>
		<Route index element={<App><Home /></App>} />
		<Route path='games' element={<App><Games /></App>} />
		<Route path='*' element={<App><Error /></App>} />

	</Route>

))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
export default function title(pageTitle:string){
	document.title=name+" - "+pageTitle;
}