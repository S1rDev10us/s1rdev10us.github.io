import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/home';
import Error from './pages/error'
import Games from './pages/games';
import './App.css'

const router = createHashRouter(createRoutesFromElements(
	<Route path='/'>
		<Route index element={<Home />} />
		<Route path='games' element={<Games />} />
		<Route path='*' element={<Error />} />

	</Route>

))
export default function App() {
	return (<RouterProvider router={router} />)
}