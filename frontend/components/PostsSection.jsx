import axios from "axios"
import { useEffect,useState } from "react"

function PostsSection() {
const [postes, setpostes] = useState([])

const getAllPostes = async() =>{
try {
  const res = await axios.get( `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/getAllPostes`,{
    withCredentials:true
  }
)
 
if(res.data.sucess){
  setpostes(res.data.poste)
}

} catch (error) {
  console.log(error);
}
}



useEffect(()=>{
  getAllPostes()
},[])

  return (
    <div className="p-5 h-full w-full">
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {postes.map((post, index) => (
        <div key={index} className="break-inside-avoid overflow-hidden rounded-xl shadow-md">
          {post.media.length > 0 && post.media[0].type !== "image" ? (
            <video
              className="w-full h-auto object-cover rounded-lg"
            >
              <source src={post.media[0].url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={post.media[0].url}
              alt={`Post ${index}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          )}
        </div>
      ))}
    </div>
  </div>
  )
}
export default PostsSection