import { createContext, useState } from "react";

export const AuthenticationContext = createContext();

export function AuthenticationContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
