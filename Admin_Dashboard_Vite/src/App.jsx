import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import RouteList from "./routes/RouteList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";

import "./App.css";

const AUTH_ROUTES = new Set(["/login", "/logout", "/register"]);

function AppLayout() {
	const location = useLocation();
	const isAuthRoute = AUTH_ROUTES.has(location.pathname);

	if (isAuthRoute) {
		return (
			<div className='authLayout'>
				<RouteList />
			</div>
		);
	}

	return (
		<>
			<Topbar />
			<main className='container'>
				<Sidebar />
				<RouteList />
			</main>
		</>
	);
}

function App() {
	return (
		<ThemeProvider>
			<>
				<BrowserRouter>
					<AppLayout />
				</BrowserRouter>
				<ToastContainer position='top-right' autoClose={3000} />
			</>
		</ThemeProvider>
	);
}

export default App;
