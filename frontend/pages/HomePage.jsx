import { useEffect, useState } from "react";
import PostComponent from "../components/PostComponent "
import axios from "axios";

function HomePage() {
  const [postes, setPostes] = useState([]);

  const getPostes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/post/feedPostes`,
        { withCredentials: true }
      );
      if (res.data.postes) {
        setPostes(res.data.postes); 
      }
    } catch (error) {
      console.log("Internal server error:", error.message);
    }
  };

  useEffect(() => {
    getPostes();
  }, []);

  console.log(postes);

  return (
    <div className="h-full w-[200%] flex flex-col justify-center items-center mx-auto relative mr-60">
      <div className="w-full flex flex-col gap-6">
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
