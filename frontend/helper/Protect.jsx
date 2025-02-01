import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../hooks/UserContextHook";
import useComponentContext from "../hooks/ComponentContextHook";
function Protect({ page }) {
  const { setuserData } = useUserContext();
  const { isLogout } = useComponentContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/auth/getMe", {
        withCredentials: true,
      });
      if (res.data.currentuser) {
        setuserData(res.data.currentuser);
      }

      if (res.data.status === false) {
        setIsAuthenticated(false);
      }
      if (res.data.status) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLogout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{page}</>;
}

export default Protect;
