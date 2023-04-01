import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/home';
import Error from './pages/error'

const router = createBrowserRouter(createRoutesFromElements(
	<Route path='/'>
		<Route index element={<Home />} />
		<Route path='*' element={<Error />} />

	</Route>

))
export default function App() {

	// return (<RouterProvider router={router} />)
	return (<RouterProvider router={router} />)
}