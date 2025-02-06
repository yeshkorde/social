import { createContext } from "react";
import { useState } from "react";
export const userContext = createContext();

const UserContextProvider = ({ children }) => {
 const [userData, setuserData] = useState([])
 const [Notifications, setNotifications] = useState([])
 const value = {
    setuserData,
    userData,
    Notifications,
    setNotifications,
 }
 
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export default UserContextProvider;
