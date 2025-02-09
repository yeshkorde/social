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
        await axios.post(
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
      className="  cursor-pointer  hover:bg-[#f4f4f4] dark:border-[#2b2b2b] flex dark:border  w-full bg-white dark:bg-black  items-center gap-4 p-3 rounded-xl shadow-md dark:shadow-lg"
      onClick={(e) => chickNotifications(e)}
      ref={NoteficationCardRef}
    >
      <div className="h-14 w-32  rounded-full">
        <img
          src={data.sender.profileImage}
          alt="profile image"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <p className="text-[12px]  ibm-plex-sans-medium">
        {data.title.split("from")[0] + "from"}
        <span className="ibm-plex-sans-semibold text-[12px]">
          {data.title.split("from")[1]}
        </span>
      </p>

      <div className="flex flex-col gap-2  relative">
        <p className="text-[8px] absolute bottom-9 text-[#b2b2b2]  right-0">
          {getDatesAndTime(data.createdAt)}
        </p>
        {data.type === "follow" ? (
          <div className="w-1/2 ">
            <FollowBtn user={data.sender} />
          </div>
        ) : (
          ""
        )}
        {!data.isSeen ? (
          <div className="h-2 absolute w-2 rounded-full bg-blue-600 top-9 right-0"></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

NotificationCard.propTypes = {
  data: propTypes.shape({
    title: propTypes.string,
    _id: propTypes.string,
    type: propTypes.string,
    createdAt: propTypes.string,
    isSeen: propTypes.bool,
    sender: propTypes.shape({
      name: propTypes.string,
      profileImage: propTypes.string,
    }).isRequired,
  }).isRequired,
};

export default NotificationCard;
