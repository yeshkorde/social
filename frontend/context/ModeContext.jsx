
import  { createContext, useContext, useState } from "react";

export const ModeContext = createContext();

const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    const html = document.querySelector("html");
    if(mode === "light"){
      html.classList.remove("light");
      html.classList.add("dark")
    }else{
      html.classList.add("light");
      html.classList.remove("dark")
    }
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};




export default ModeContextProvider;
