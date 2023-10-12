import { createContext, useState } from "react";

export const CurrentProfileContext = createContext();

export function CurrentProfileContextProvider({ children }) {
  const [currentProfile, setCurrentProfile] = useState({});
  return (
    <CurrentProfileContext.Provider
      value={{ currentProfile, setCurrentProfile }}
    >
      {children}
    </CurrentProfileContext.Provider>
  );
}
