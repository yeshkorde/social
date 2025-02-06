import { useEffect} from "react";
import useUserContext from "../hooks/UserContextHook";
import useSocketContext from "../hooks/SocketContextHook";
import { useToast } from "@/hooks/use-toast";
import NotificationCard from "./NotificationCard";

function NotificationSection() {
  const {Notifications, setNotifications  } = useUserContext();
const {socket} = useSocketContext()
const { toast } = useToast();

  
useEffect(()=>{
socket.on("/followNotificatio",(data)=>{
  setNotifications((prev) => {
    if (!Array.isArray(prev)) return [data];
    return prev.some((item) => item._id === data._id) ? prev : [...prev, data]; 
  });
  toast({
    title:data.title
  })
})
},[])

  return (

    <div className="h-screen w-full pl-28 px-4 pt-6 flex flex-col gap-4 bg-white dark:bg-black z-[9999]">
      <h1 className="text-2xl ibm-plex-sans-semibold ml-2 font-semibold text-gray-900 dark:text-white">
        Notifications
      </h1>
      <div className="flex-1 w-full flex flex-col gap-4 mt-4  relative">
        { Notifications?.map((not, ind) => (
         <NotificationCard data={not} key={ind}/>
        ))}
      </div>
    </div>
  );
}

export default NotificationSection;
