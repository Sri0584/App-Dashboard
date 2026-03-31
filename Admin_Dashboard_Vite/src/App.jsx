import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import RouteList from "./routes/RouteList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
	return (
		<>
			<BrowserRouter>
				<Topbar />
				<div className='container'>
					<Sidebar />
					<RouteList />
				</div>
			</BrowserRouter>
			<ToastContainer position='top-right' autoClose={3000} />
		</>
	);
}

export default App;
