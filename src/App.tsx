import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/home/Home";
import Room from "@/pages/room/Room";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Wraper from "./components/Wraper";
import Profile from "./pages/profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <Wraper>
                  <Home />
                </Wraper>
              </div>
            }
          />
          <Route
            path="/room/:roomId"
            element={
              <div>
                <ProtectedRoute>
                  <Wraper>
                    <Room />
                  </Wraper>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Wraper>
                  <Login />
                </Wraper>
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Wraper>
                  <Register />
                </Wraper>
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div>
                <ProtectedRoute>
                  <Wraper>
                    <Profile />
                  </Wraper>
                </ProtectedRoute>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
