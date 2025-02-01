import { useEffect } from "react"
import useUserContext from "../hooks/UserContextHook"

function FollowBtn({UserId}) {

const { userData,} = useUserContext()

useEffect(()=>{
  if(userData._id === UserId){
    console.log("you");
    
  }else{
    console.log("another");
    console.log("hrlel");
    
  }
})


  return (
    <button className="py-1 text-sm text-white ibm-plex-sans-semibold w-20 rounded-lg  bg-blue-600 ml-10">Follow</button>
  )
}

export default FollowBtn