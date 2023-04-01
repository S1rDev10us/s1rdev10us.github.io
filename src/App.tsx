import { HashRouter, Route, RouterProvider, Routes, createHashRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './pages/root'

const router = createHashRouter(createRoutesFromElements(
	<Route path='/' element={<Root/>}>

	</Route>
))
export default function App() {

	return (<RouterProvider router={router} />)
}