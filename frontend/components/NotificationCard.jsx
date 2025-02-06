import { useRef } from "react";
import propTypes from "prop-types";
import useUserContext from "../hooks/UserContextHook";
import axios from "axios";
import FollowBtn from "./FollowBtn";
import getDatesAndTime from "../utils/GetDate";


function NotificationCard({ data }) {
  const NoteficationCardRef = useRef();

  const { Notifications, setNotifications } = useUserContext();



 

  const chickNotifications = async (e) => {
    if (!data.isSeen) {
      let chick = Notifications.map((not) => {
        if (not._id === data._id) {
          not.isSeen = true;
        }
        return not;
      });
      setNotifications(chick);

      setTimeout(async () => {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/chickNotifications`,
          { notificationId: data._id },
          {
            withCredentials: true,
          }
        ); 
      }, 2000);
    }
  };

  return (
    <div
      className="  cursor-pointer absolute hover:bg-[#f4f4f4] dark:border-[#2b2b2b] dark:border w-full bg-white dark:bg-black flex items-start  justify-start p-3 rounded-xl gap-4 shadow-md dark:shadow-lg"
      onClick={(e) => chickNotifications(e)}
      ref={NoteficationCardRef}
    >
      <div className="h-[40px] w-[52px] mt-2 rounded-full overflow-hidden">
        <img
          src={data.sender?.profileImage}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" w-full flex flex-col justify-center gap-1 py-2">
        <div className=" flex w-full ">
        <div className=" flex ">
        <h1 className="ibm-plex-sans-semibold text-sm text-gray-900 dark:text-white">
            {data.title}
          </h1>
          <p className="ibm-plex-sans-medium w-1/4 mt-1  ml-2 text-[10px] text-[#4e4e4e] dark:text-white">{getDatesAndTime(data.createdAt)}</p>
        </div>
          {data.isSeen ? (
            ""
          ) : (
            <div className="h-[8px] w-[10px] rounded-full bg-blue-600 mt-2"></div>
          )}
        </div>
        <h2 className="ibm-plex-sans-semibold text-xs text-gray-600 dark:text-gray-300">
          {data.sender?.name}
        </h2>
        <p className="ibm-plex-sans text-xs text-gray-500 dark:text-gray-400 leading-tight max-w-xs"></p>
     {
      data.type === "follow" ?
      (<div className="mt-2 w-full ">
        <FollowBtn user={data.sender}/>
      </div>):""
     }
      </div>
    </div>
  );
}

NotificationCard.propTypes = {
  data: propTypes.shape({
    title: propTypes.string,
    _id: propTypes.string,
    type:propTypes.string,
    createdAt:propTypes.string,
    isSeen: propTypes.bool,
    sender: propTypes.shape({
      name: propTypes.string,
      profileImage: propTypes.string,
     
    }).isRequired,
  }).isRequired,
};

export default NotificationCard;
