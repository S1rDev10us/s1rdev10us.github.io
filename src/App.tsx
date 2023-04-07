import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/home';
import Error from './pages/error'
import Games from './pages/games';
import './App.css'
import { ReactNode } from 'react';
import Navbar from './components/navbar';

export default function App(input: { children: ReactNode }) {
	return <>
		<Navbar />
		{input.children}
	</>
}