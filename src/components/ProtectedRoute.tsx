import { useAuth } from "@/context/AuthContext";
import Login from "@/pages/Login";
import React from "react";
import Wraper from "./Wraper";
import { setRedirectUrl } from "@/utils/utils";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  // if auth sate not present then store url in local storageusing setRedirectUrl function
  if (!authState) {
    setRedirectUrl(window.location.pathname);
  }

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
