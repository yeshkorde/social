import useComponentContext from "../hooks/ComponentContextHook";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import PostsSection from "../components/PostsSection";
import ReelsSection from "../components/ReelsSection";
import { useSearchParams } from "react-router-dom";
import FollowBtn from "../components/FollowBtn";

function UserProfilePage() {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("id");
  const postRef = useRef();
  const [isLoding, setisLoding] = useState(false);
  const { isOn } = useComponentContext();

  const [profileData, setprofileData] = useState({});

  const moveRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/api/user/getProfileData?userId=${userId}`,
          { withCredentials: true }
        );

        if (res.data.user) {
          setprofileData(res.data.user);
          setactiveSection(<PostsSection postes={res.data.user.postes} />);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfile();
  }, [userId]);

  const [activeSection, setactiveSection] = useState();

  const moveToPosts = () => {
    if (activeSection === <PostsSection />) return;

    setactiveSection(<PostsSection postes={profileData.postes} />);

    gsap.to(moveRef.current, {
      x: 285,
      ease: "back.out",
    });
  };

  const moveToSReels = () => {
    if (activeSection === <ReelsSection />) return;

    setactiveSection(<ReelsSection />);

    gsap.to(moveRef.current, {
      x: 905,
      ease: "back.out",
    });
  };

  return (
    <div
      className={`h-full relative ${
        isOn.isNotificationOn || isOn.isSearchOn ? "-z-[3]" : ""
      }  w-[500%] `}
    >
      <div className="h-[710px] w-full absolute bg-white/60 dark:bg-black/60 z-30 flex justify-center items-center hidden p-4">
        <div className="h-52 rounded-2xl w-1/3 bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]    dark:bg-black dark:shadow-[#000]">
          <div className="px-8 py-4 h-1/2 flex flex-col justify-center gap-4 items-center">
            <div className="w-full h-full items-center  flex flex-col gap-4 pt-4">
              <div className="h-10 w-full  flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                  className="cursor-pointer file:black dark:fill-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
                </svg>
              </div>
              <button className="py-2 px-6 w-full rounded-xl border ibm-plex-sans-semibold ">
                Remove Profile Image
              </button>
              <button className="py-2 px-6 rounded-xl border ibm-plex-sans-semibold w-full">
                Change Profile Image
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`h-full w-full bg-white shadow-lg      dark:bg-[#000000]  rounded-2xl p-10 overflow-hidden relative`}
      >
        <div className="h-80 w-full box bg-[#ffffff] dark:border-b dark:border-[#2b2b2b] dark:bg-[#000] dark:rounded-[0px]  rounded-3xl relative overflow-hidden shadow-[3px_3px_30px] shadow-[#e6e6e6] dark:shadow-[#000]">
          <div className="h-full  bg-[#fff] w-full dark:bg-black  absolute rounded-3xl items-center flex p-6   gap-10">
            <div className="h-72 w-72 profileImage rounded-full dark:border dark:border-[#2b2b2b] shadow-[3px_3px_30px] shadow-[#e6e6e6] flex justify-center items-center  p-1 dark:shadow-[#000] relative ">
              <img
                src={profileData.profileImage}
                alt=""
                className="h-full w-full object-cover object-top rounded-full absolute"
              />
            </div>
            <div className="p-10 h-full w-1/2 flex flex-col gap-2  ">
              <p className="ibm-plex-sans-semibold profileData text-2xl text-[#1f1f1f] dark:text-white">
                {profileData.userName}
              </p>
              <p className="ibm-plex-sans-semibold profileData text-md text-[#2e2e2e] dark:text-white">
                {profileData.name}
              </p>
              <p className="ibm-plex-sans-semibold profileData text-md text-[#2e2e2e] dark:text-white">
                {profileData.bio ? profileData.bio : "No Bio "}
              </p>
              <div className="flex mt-2 gap-4">
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e] dark:text-white">
                  Followers {profileData.followers?.length}
                </p>
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e] dark:text-white">
                  Following {profileData.following?.length}
                </p>
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e]  dark:text-white">
                  postes {profileData.postes?.length}
                </p>
                <FollowBtn user={profileData}/>
              </div>
           
            </div>
          </div>
        </div>
        {profileData.isPrivate ? (
          <div className="h-full w-full p-10 flex justify-center items-center">
            <div className="h-40 bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  flex justify-center items-center  gap-4  dark:bg-black dark:shadow-[#000] w-full rounded-xl ">
              <svg aria-label="" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="48" role="img" viewBox="0 0 96 96" width="48"><title></title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
           <div>
           <h1 className="ibm-plex-sans-semibold text-xl text-center">
                This account is private
              </h1>
              <p className="text-[10px] text-center text-[#313131] ibm-plex-sans-medium dark:text-[#d6d6d6]">follow to see their postes and videos</p>
              
           </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full p-4 mt-10  border-b  dark:bg-[#000000] ">
              <div className="w-full flex justify-around text-[#000000] dark:text-white items-center">
                <p
                  className="ibm-plex-sans-semibold cursor-pointer hover:text-[#3a3a3a]  dark:hover:text-[#b8b8b8]"
                  onClick={moveToPosts}
                  ref={postRef}
                >
                  Posts
                </p>

                <p
                  className="ibm-plex-sans-semibold cursor-pointer hover:text-[#3a3a3a]  dark:hover:text-[#b8b8b8]"
                  onClick={moveToSReels}
                >
                  Reels
                </p>
              </div>
              <div
                ref={moveRef}
                className="h-1 mt-1 dark:bg-white translate-x-[285px] w-12 bg-[#1e1e1e] rounded-2xl border"
              ></div>
            </div>
            <div className="h-full w-full rounded-xl  mt-10">
              {activeSection}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
