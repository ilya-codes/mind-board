import { createContext, useEffect, useState } from "react";

const AppContext = createContext(false);

export const ContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const [isJapanese, setIsJapanese] = useState(true);

  const darkHandler = () => {
    setDark(!dark);
    localStorage.setItem("theme", JSON.stringify(!dark));
  };

  const langHandler = () => {
    setIsJapanese(!isJapanese);
    localStorage.setItem("language", JSON.stringify(!isJapanese));
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("theme")) !== null) {
      setDark(JSON.parse(localStorage.getItem("theme")));
    }
    if (JSON.parse(localStorage.getItem("language")) !== null) {
      setIsJapanese(JSON.parse(localStorage.getItem("language")));
    }
  }, []);

  const context = {
    darkHandler,
    dark,
    langHandler,
    isJapanese,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
