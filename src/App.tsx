import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import JobPage from "./pages/job/Job";


function App() {


	return (
		<>
			<BrowserRouter>
				<div className="flex items-center px-8 ">
					<img
						className="w-auto h-20"
						src="logo.png"
						alt="Description of the image"
					/>
				</div>
				<Routes>
					<Route
						path="/"
						element={
							<div>
								{" "}
								<Home />{" "}
							</div>
						}
					/>
					<Route
						path="job"
						element={
							<div>
								{" "}
								<JobPage />{" "}
							</div>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
