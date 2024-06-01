import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"; // Adjust the import according to your structure

const Navbar: React.FC = () => {
  const { authState, clearAuthState } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              Home
            </Link>
          </div>
          <div className="hidden space-x-4 md:flex">
            {authState ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    clearAuthState();
                    navigate("/");
                    window.location.reload();
                  }}
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-blue-700"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-700"
          >
            Home
          </Link>
          {authState ? (
            <>
              <Link
                to="/profile"
                className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-700"
              >
                Profile
              </Link>
              <Button
                onClick={clearAuthState}
                className="block w-full px-3 py-2 text-base font-medium text-left text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
