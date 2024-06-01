import { useAuth } from "@/context/AuthContext";
import Login from "@/pages/Login";
import React from "react";
import Wraper from "./Wraper";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  return (
    <div>
      {authState ? (
        children
      ) : (
        <Wraper>
          <Login />
        </Wraper>
      )}
    </div>
  );
}

export default ProtectedRoute;
