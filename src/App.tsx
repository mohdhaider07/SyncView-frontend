import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Room from "@/pages/room/Room";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login"
import Register from "@/pages/Register";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home />
              </div>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <div>
                <Room />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Register />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
