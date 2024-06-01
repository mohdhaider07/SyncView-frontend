import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  createdRooms: string[];
  joinedRooms: string[];
  invitations: string[];
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextProps {
  authState: AuthState | null;
  setAuthState: (authData: AuthState) => void;
  clearAuthState: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("authState");
    if (storedAuthState) {
      setAuthState(JSON.parse(storedAuthState));
    }
  }, []);

  const setAuthData = (authData: AuthState) => {
    setAuthState(authData);
    localStorage.setItem("authState", JSON.stringify(authData));
  };

  const clearAuthState = () => {
    setAuthState(null);
    localStorage.removeItem("authState");
  };

  return (
    <AuthContext.Provider
      value={{ authState, setAuthState: setAuthData, clearAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
