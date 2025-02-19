import { useEffect, useState } from "react";
import gsap from "gsap";

import useModecontext from "../hooks/ModeContextHook";
import useUserContext from "../hooks/UserContextHook";
import { Link } from "react-router-dom";
import useComponentContext from "../hooks/ComponentContextHook";
import SearchUser from "./SearchUser";
import axios from "axios";
import NotificationSection from "./NotificationSection";
import { motion } from "motion/react";
function LeftSideBar() {
  const { isOn, setisOn } = useComponentContext();
  const { userData, Notifications } = useUserContext();
  const { mode, toggleMode } = useModecontext();
  const { setisLogout } = useComponentContext();
  const [isLoding, setisLoding] = useState(false);
  const [isNoteficationNoSeen, setisNoteficationNoSeen] = useState(6);

  useEffect(() => {
    if (isOn.isNotificationOn) {
      gsap.to(".notificationBlock", {
        width: "100%",
        height: "100%",
      });
      gsap.to(".notificationBox", {
        rotate: 360,
        duration: 0.5,
      });
    } else {
      gsap.to(".notificationBlock", {
        width: "0%",
        height: "0%",
      });
      gsap.to(".notificationBox", {
        rotate: -360,
        duration: 0.5,
      });
    }

    if (isOn.isSearchOn) {
      gsap.to(".searchBlock", {
        width: "100%",
        height: "100%",
      });
      gsap.to(".searchBox", {
        rotate: 360,
        duration: 0.5,
      });
    } else {
      gsap.to(".searchBlock", {
        width: "0%",
        height: "0%",
      });
      gsap.to(".searchBox", {
        rotate: -360,
        duration: 0.5,
      });
    }
  }, [isOn]);

  useEffect(() => {
    if (mode === "light") {
      gsap.to(".lightModeBox", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".darkModeBox", {
        x: "100%", // Move out of view
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else if (mode === "dark") {
      gsap.to(".lightModeBox", {
        x: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(".darkModeBox", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [mode]);

  const handleLogOut = async () => {
    try {
      setisLoding(true);
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/logout`,
        {
          withCredentials: true,
        }
      );

      if (res.data.status) {
        return setisLogout(true);
      }
      setisLoding(false);
    } catch (error) {
      console.log("some thing want wrong to logout ", error.message);
    }
  };

  const hnadleLode = (e) => {
    if (e.target.naturalHeight > 1350) {
      e.target.classList.add("object-top");
    } else if (e.target.naturalHeight < 1000) {
      e.target.classList.add("object-top");
    } else {
      e.target.classList.add("object-top");
    }
  };

  useEffect(() => {
    const unseenNotifications = Notifications.filter((not) => !not.isSeen);
    setisNoteficationNoSeen(unseenNotifications.length);
  }, [Notifications]);

  return (
    <div className="h-full w-1/3 relative p-10 hidden sm:hidden md:hidden lg:block ">
      <div className="fixed top-0 left-0 h-full w-1/3 p-2 ">
        <div className="h-full w-full relative  rounded-3xl flex justify-start items-center ">
          <div className="h-full w-full notificationBlock absolute  dark:border dark:border-[#2b2b2b] dark:shadow-xl  bg-[#ffffff] leftside rounded-3xl shadow-[3px_3px_30px] shadow-[#e6e6e6]    dark:bg-black dark:shadow-[#000] overflow-y-auto scrollHidden ">
            <NotificationSection />
          </div>
          <div className="h-full w-full  absolute bg-[#ffffff] dark:shadow-xl dark:border dark:border-[#2b2b2b] dark:bg-[#000000] dark:shadow-[#0000009c] leftside rounded-3xl searchBlock overflow-hidden shadow-neumorphic">
            <SearchUser />
          </div>
          <div className="h-[98%] m-2 w-[90px] dark:border dark:border-[#2b2b2b]  dark:bg-[#000000]  absolute  mainsideBar  bg-white rounded-3xl flex p-4  flex-col overflow-hidden gap-5 shadow-2xl">
            <Link to={"/"}>
              <motion.div
              whileTap={{
                scale:0.3
              }}
               className="w-full h-14  dark:bg-[#000000] flex item justify-center cursor-pointer  dark:border dark:border-[#2b2b2b]  dark:shadow-darkneumorphic items-center rounded-full bg-white shadow-neumorphic  overflow-hidden hover:shadow-lg ">
                <svg
                  aria-label="Home"
                  className="x1lliihq x1n2onr6 x5n08af dark:fill-white"
                  fill="currentColor"
                  height="20"
                  role="img"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <title>Home</title>
                  <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
                </svg>
              </motion.div>
            </Link>
            <motion.div
              whileTap={{
                scale:0.3
              }}
              className="w-full h-14 flex justify-center dark:bg-[#000000] dark:border dark:border-[#2b2b2b] items-center dark:shadow-darkneumorphic cursor-pointer searchBox item bg-white rounded-full shadow-neumorphic hover:shadow-lg "
              onClick={() => setisOn({ isSearchOn: !isOn.isSearchOn })}
            >
              <svg
                aria-label="Search"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white"
                fill="currentColor"
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <title>Search</title>
                <path
                  d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  className="dark:stroke-white"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-white"
                  strokeWidth="2"
                  x1="16.511"
                  x2="22"
                  y1="16.511"
                  y2="22"
                ></line>
              </svg>
            </motion.div>

            <motion.div
              whileTap={{
                scale:0.3
              }} className="w-full h-14 flex dark:bg-[#000000] dark:border dark:border-[#2b2b2b] justify-center dark:shadow-darkneumorphic item items-center bg-[#fff] cursor-pointer  rounded-full shadow-neumorphic hover:shadow-lg ">
              <svg
                aria-label="Reels"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white"
                fill="currentColor"
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <title>Reels</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  className="dark:stroke-white"
                  strokeWidth="2"
                  x1="2.049"
                  x2="21.95"
                  y1="7.002"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-white"
                  strokeWidth="2"
                  x1="13.504"
                  x2="16.362"
                  y1="2.001"
                  y2="7.002"
                ></line>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:stroke-white"
                  strokeWidth="2"
                  x1="7.207"
                  x2="10.002"
                  y1="2.11"
                  y2="7.002"
                ></line>
                <path
                  d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="dark:stroke-white"
                ></path>
                <path
                  d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </motion.div>
            <motion.div
              whileTap={{
                scale:0.3
              }} className="w-full h-14 dark:shadow-darkneumorphic dark:border dark:border-[#2b2b2b] dark:bg-[#000000] flex justify-center item items-center bg-[#fff] cursor-pointer rounded-full shadow-neumorphic hover:shadow-lg ">
              <svg
                aria-label="Messenger"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white"
                fill="currentColor"
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <title>Messenger</title>
                <path
                  d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.739"
                  className="dark:stroke-white"
                ></path>
                <path
                  d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </motion.div>
            <motion.div
              whileTap={{
                scale:0.3
              }}
              className="w-full dark:shadow-darkneumorphic dark:border dark:border-[#2b2b2b] h-14 dark:bg-[#000000] flex justify-center item items-center notificationBox cursor-pointer bg-[#fff]  rounded-full shadow-neumorphic hover:shadow-lg  relative"
              onClick={() =>
                setisOn({ isNotificationOn: !isOn.isNotificationOn })
              }
            >
              <svg
                aria-label="Notifications"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white absolute"
                fill="currentColor"
                height="20"
                role="img"
                viewBox="0 0 24 24"
                width="20"
              >
                <title>Notifications</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
              {isNoteficationNoSeen > 0 ? (
                <div className="h-6 w-6 rounded-full bg-red-600 right-[-3px] top-[-10px] absolute flex justify-center items-center">
                  <p className="text-white ibm-plex-sans-semibold ">
                    {isNoteficationNoSeen}
                  </p>
                </div>
              ) : (
                ""
              )}
            </motion.div>
            <Link to={"/create"}>
              <motion.div
              whileTap={{
                scale:0.3
              }} className="w-full h-14 dark:shadow-darkneumorphic dark:border dark:border-[#2b2b2b] dark:bg-[#000000] flex justify-center item cursor-pointer items-center bg-[#fff]  rounded-full shadow-neumorphic hover:shadow-lg">
                <svg
                  aria-label="New post"
                  className="x1lliihq x1n2onr6 x5n08af dark:fill-white"
                  fill="currentColor"
                  height="20"
                  role="img"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <title>New post</title>
                  <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="dark:stroke-white"
                  ></path>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="dark:stroke-white"
                    x1="6.545"
                    x2="17.455"
                    y1="12.001"
                    y2="12.001"
                  ></line>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="dark:stroke-white"
                    x1="12.003"
                    x2="12.003"
                    y1="6.545"
                    y2="17.455"
                  ></line>
                </svg>
              </motion.div>
            </Link>
            <Link to={"/profile"}>
              <motion.div
              whileTap={{
                scale:0.3
              }} className="w-full h-14 flex justify-center dark:border object-cover object-top dark:border-[#2b2b2b] dark:bg-[#000000] dark:shadow-darkneumorphic item items-center cursor-pointer bg-[#fff]  rounded-full shadow-neumorphic hover:shadow-lg ">
                <div className="h-full w-full rounded-full p-1 ">
                  <img
                    onLoad={hnadleLode}
                    src={userData.profileImage}
                    alt=""
                    className="object-cover object-center  w-full h-full  rounded-full"
                  />
                </div>
              </motion.div>
            </Link>
            <motion.div
              whileTap={{
                scale:0.3
              }}
              className="w-full  h-14 dark:border dark:border-[#2b2b2b] flex dark:shadow-darkneumorphic dark:bg-[#000000] justify-center item cursor-pointer items-center bg-[#ffff]  rounded-full shadow-neumorphic hover:shadow-lg "
              onClick={handleLogOut}
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="font-bold dark:fill-white"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="dark:fill-white"
                  d="M6 4C5.44772 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H10C10.5523 20 11 20.4477 11 21C11 21.5523 10.5523 22 10 22H6C4.34315 22 3 20.6569 3 19V5C3 3.34315 4.34315 2 6 2H10C10.5523 2 11 2.44772 11 3C11 3.55228 10.5523 4 10 4H6ZM15.2929 7.29289C15.6834 6.90237 16.3166 6.90237 16.7071 7.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L16.7071 16.7071C16.3166 17.0976 15.6834 17.0976 15.2929 16.7071C14.9024 16.3166 14.9024 15.6834 15.2929 15.2929L17.5858 13H11C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11H17.5858L15.2929 8.70711C14.9024 8.31658 14.9024 7.68342 15.2929 7.29289Z"
                  fill="currentColor"
                ></path>
              </svg>
            </motion.div>
            <motion.div
              whileTap={{
                scale:0.3
              }}iv

              className="w-full h-14  flex justify-center  dark:shadow-darkneumorphic relative item bg-white cursor-pointer items-center rounded-full shadow-neumorphic hover:shadow-lg overflow-hidden"
              onClick={toggleMode}
            >
              <div className="absolute h-full w-full  flex lightModeBox justify-center  items-center rounded-full cursor-pointer bg-black">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="25"
                  width="25"
                >
                  <path
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    className="fill-white stroke-white"
                  ></path>
                  <path
                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                    className="stroke-white"
                  ></path>
                </svg>
              </div>
              <div className="absolute h-full w-full rounded-full  dark:shadow-darkneumorphic darkModeBox flex justify-center items-center cursor-pointer bg-white">
                <svg viewBox="0 0 24 24" fill="none" height="25" width="25">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                    className="fill-black"
                  ></path>
                  <path
                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                    className="fill-black"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                    className="fill-black"
                  ></path>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideBar;
