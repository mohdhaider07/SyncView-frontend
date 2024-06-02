import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button"; // Adjust the import according to your structure

const Navbar: React.FC = () => {
  const { authState, clearAuthState } = useAuth();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const navigate = useNavigate();
  return (
    <nav className="text-primary bg-white w-full shadow-lg">
      <div className="px-4 mx-auto  sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex gap-2 text-2xl font-bold text-primary">
            <img className="w-8 rounded-full aspect-square" src="/logo.avif"></img>
            SyncView
          </Link>
          <div className="hidden space-x-4 md:flex">
            <Link
              to="/"
              className="px-3 hover:underline py-2 text-sm font-medium text-primary  rounded-md "
            >
              Home
            </Link>
            {authState ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 hover:underline py-2 text-sm font-medium text-primary  rounded-md "
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    clearAuthState();
                    navigate("/");
                    window.location.reload();
                  }}
                  className="px-3 py-2 hover:bg-white hover:underline text-sm font-medium  text-primary rounded-md"
                  variant="ghost"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm hover:underline font-medium text-primary rounded-md"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 hover:underline text-sm font-medium  text-primary rounded-md "
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-primary  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
      {showDropdown && (
        <div
          className="md:hidden absolute bg-white w-full z-50 shadow-lg"
          id="mobile-menu"
        >
          <div className="px-2 flex flex-col pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="px-3 hover:underline py-2 text-sm font-medium text-primary  rounded-md "
            >
              Home
            </Link>
            {authState ? (
              <>
                <Link
                  to="/profile"
                  className="px-3 hover:underline py-2 text-sm font-medium text-primary  rounded-md "
                >
                  Profile
                </Link>
                <Button
                  onClick={() => {
                    clearAuthState();
                    navigate("/");
                    window.location.reload();
                  }}
                  className="px-3 justify-start py-2 hover:bg-white hover:underline text-sm font-medium  text-primary rounded-md"
                  variant="ghost"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm hover:underline font-medium text-primary rounded-md"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-3 py-2 hover:underline text-sm font-medium  text-primary rounded-md "
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
