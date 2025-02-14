import { createContext } from "react";
import { useState } from "react";
export const ComponentContext = createContext();

const ComponentContextProvider = ({ children }) => {
    const [isOn, setisOn] = useState({
        isSearchOn: false,
        isNotificationOn: false,
      });
      const [isLogout, setisLogout] = useState(false)
const [isMuted, setisMuted] = useState(true)      



 const value = {
   isOn,
   setisOn,
   isLogout,
   setisLogout,
   isMuted,
   setisMuted
 }
 
  return <ComponentContext.Provider value={value}>{children}</ComponentContext.Provider>;
};



export default ComponentContextProvider;
