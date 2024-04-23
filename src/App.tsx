import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import JobPage from "./pages/job/Job";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<div> <Home /> </div>} />
				<Route path="job" element={<div> <JobPage /> </div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
