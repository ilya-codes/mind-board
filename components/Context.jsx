import { createContext, useState } from "react";

const AppContext = createContext(false);

export const ContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [isJapanese, setIsJapanese] = useState(false);

  const darkHandler = () => {
    setDark(!dark);
  };

  const langHandler = () => {
    setIsJapanese(!isJapanese);
  };

  const context = {
    darkHandler,
    dark,
    langHandler,
    isJapanese,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
