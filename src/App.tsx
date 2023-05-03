import './App.css'
import { ReactNode } from 'react';
import Navbar from './components/navbar';

export default function App(input: { children: ReactNode }) {
	return <>
		<Navbar />
		{input.children}
	</>
}