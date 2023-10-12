import { createContext, useState } from "react";

export const ContentContext = createContext();

export function ContentContextProvider({ children }) {
  const [content, setContent] = useState([]);

  return (
    <ContentContext.Provider value={{ content, setContent }}>
      {children}
    </ContentContext.Provider>
  );
}
