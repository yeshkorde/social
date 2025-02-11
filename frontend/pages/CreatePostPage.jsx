import useComponentContext from "../hooks/ComponentContextHook";
import { useState,useRef} from "react";
import gsap from "gsap";

import PostsSection from "../components/PostsSection";

import CreatePost from "../components/CreateSections/CreatePost";
import CreateStory from "../components/CreateSections/CreateStory";
import CreateReel from "../components/CreateSections/CreateReel";
function CreatePostPage() {
  const moveRef = useRef();
  const [activeSection, setactiveSection] = useState(<CreatePost />);
  const { isOn } = useComponentContext();
 

  const moveToPosts = () => {
    if (activeSection === <PostsSection />) return;

    setactiveSection(<CreatePost />);

    gsap.to(moveRef.current, {
      x:160 ,
      ease: "back.out",
    });
  };

  const moveToSaved = () => {
    if (activeSection === <CreateReel />) return;

    setactiveSection(<CreateReel />);

    gsap.to(moveRef.current, {
      x:570,
      ease: "back.out",
    });
  };

  const moveToSReels = () => {
    if (activeSection === <CreateStory />) return;

    setactiveSection(<CreateStory />);

    gsap.to(moveRef.current, {
      x:980,
      ease: "back.out",
    });
  };



  return (
    <div
      className={`h-full w-[500%]   px-10 py-10 rounded-3xl dark:bg-black bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border ${
        isOn.isNotificationOn || isOn.isSearchOn ? "-z-[3]" : "z-[9]"
      }  dark:shadow-[#000]`}
    >
      <h1 className="text-2xl text-center ibm-plex-sans-semibold flex gap-2 w-full justify-center items-center"><p className="heading">Post,</p> <p className="heading">Reel,</p> <p className="heading">&</p> <p className="heading">Store</p> <p className="heading">Creator</p></h1>
 <div className="w-full p-4 mt-10 section   dark:bg-[#000000] ">
          <div className="w-full flex justify-around text-[#000000] dark:text-white items-center">
            <p
              className="ibm-plex-sans-semibold options cursor-pointer hover:text-[#3a3a3a]  dark:hover:text-[#b8b8b8]"
              onClick={moveToPosts}
            >
              Create Post
            </p>
            <p
              className="ibm-plex-sans-semibold options cursor-pointer hover:text-[#3a3a3a]  dark:hover:text-[#b8b8b8]"
              onClick={moveToSaved}
            >
              Create Reel
            </p>
            <p
              className="ibm-plex-sans-semibold options cursor-pointer hover:text-[#3a3a3a]  dark:hover:text-[#b8b8b8]"
              onClick={moveToSReels}
            >
             Create Story
            </p>
          </div>
          <div
            ref={moveRef}
            className="h-1 mt-1 dark:bg-white translate-x-[148px] bar w-24 bg-[#1e1e1e] rounded-2xl border"
          ></div>
        </div>
        <div className="h-10 w-full rounded-xl  mt-10">
          {activeSection}
        </div>
    </div>
  );
}

export default CreatePostPage;
