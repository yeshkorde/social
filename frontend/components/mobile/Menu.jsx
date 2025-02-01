
import useUserContext from "../../hooks/UserContextHook";
import { Link } from "react-router-dom";
function Menu() {

  const {userData} = useUserContext()

  return (
    <div className=" w-full  h-[10%]   block lg:hidden fixed bottom-0 ">
      <div className="h-full w-full   rounded-lg relative flex justify-center items-center ">
        <div className="h-full w-full absolute   flex justify-center items-center  sm:w-[90%] rounded-lg"></div>
        <div className="h-full w-full absolute bg-white flex justify-around items-center dark:border dark:border-[#2b2b2b] dark:bg-[#000]">
        <div className="w-12 h-12 sm:h-16  sm:w-16 flex  justify-center dark:shadow-darkneumorphic dark:border dark:border-[#2b2b2b] dark:bg-[#000] item items-center bg-[#fff] cursor-pointer  rounded-full shadow-neumorphic hover:shadow-lg ">
              <svg
                aria-label="Reels"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white   h-6 w-6"
                fill="currentColor"
             
                role="img"
                viewBox="0 0 24 24"
              
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
            </div>
            <div
              className=" dark:shadow-darkneumorphic w-12 h-12 dark:border dark:border-[#2b2b2b] dark:bg-[#000]  sm:h-16  sm:w-16  flex justify-center item items-center notificationBox cursor-pointer bg-[#fff]  rounded-full shadow-neumorphic hover:shadow-lg "
              
            >
              <svg
                aria-label="Notifications"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white sm:h-10 sm:w-10 h-6 w-6"
                fill="currentColor"
             
                role="img"
                viewBox="0 0 24 24"
                
              >
                <title>Notifications</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
            </div>
            <Link to={"/"}>
           <div className="w-12 h-12 sm:h-16 dark:border dark:border-[#2b2b2b] dark:bg-[#000]  sm:w-16 flex  justify-center dark:shadow-darkneumorphic item items-center bg-[#fff] cursor-pointer  rounded-full shadow-neumorphic hover:shadow-lg ">
          <svg
                aria-label="Home"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white sm:h-8 sm:w-8 h-6 w-6"
                fill="currentColor"
               
                role="img"
                viewBox="0 0 24 24"
               
              >
                <title>Home</title>
                <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
              </svg>
          </div>
          </Link>
          <div className="w-12 h-12 dark:border dark:border-[#2b2b2b] dark:bg-[#000] sm:h-16  sm:w-16 dark:shadow-darkneumorphic  flex justify-center item items-center bg-[#fff] cursor-pointer rounded-full shadow-neumorphic hover:shadow-lg ">
              <svg
                aria-label="Messenger"
                className="x1lliihq x1n2onr6 x5n08af dark:fill-white sm:h-10 sm:w-10 h-6 w-6"
                fill="currentColor"
                role="img"
                viewBox="0 0 24 24"
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
            </div>
            <Link to={"/profile"}>
          <div className="w-12 h-12 sm:h-16 dark:border dark:border-[#2b2b2b] dark:bg-[#000]  sm:w-16 flex justify-center  dark:shadow-darkneumorphic item items-center cursor-pointer bg-[#fff]  rounded-full shadow-neumorphic hover:shadow-lg ">
              <div className="h-full w-full rounded-full p-1 ">
                <img
                  src={userData.profileImage}
                  alt=""
                  className="object-cover object-center  w-full h-full  rounded-full"
                />
              </div>
            </div>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
