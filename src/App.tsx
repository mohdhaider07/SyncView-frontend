import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import JobPage from "./pages/job/Job";

function App() {
	return (
		<BrowserRouter>
			<div className="bg-slate-100 min-h-24 flex">
				<img className="max-w-32" src="logo.png" alt="Description of the image" />
			</div>
			<Routes>
				<Route path="/" element={<div> <Home /> </div>} />
				<Route path="job" element={<div> <JobPage /> </div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
