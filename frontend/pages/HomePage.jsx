import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent "
import axios from "axios";
import useComponentContext from "../hooks/ComponentContextHook";

function HomePage() {
  const [postes, setPostes] = useState([]);
  const { isOn } = useComponentContext();


  const getPostes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/post/feedPostes`,
        { withCredentials: true }
      );
      if (res.data.posts) {
        setPostes(res.data.posts); 
      }
    } catch (error) {
      console.log("Internal server error:", error.message);
    }
  };

  useEffect(() => {
    getPostes();
  }, []);


  return (
    <div className="h-full w-[200%] flex flex-col justify-center items-center">
      <div className={`w-full flex flex-col gap-6 -translate-x-40 ${
        isOn.isNotificationOn || isOn.isSearchOn ? "-z-[3]" : ""
      }`}>
        {postes.length > 0 ? (
          postes.map((post,ind) => 
            <PostComponent key={ind} post={post}/>
        )
        ) : (
          <p className="text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
