import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Room from "@/pages/room/Room";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {" "}
                <Home />
              </div>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <div>
                {" "}
                <Room />{" "}
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
