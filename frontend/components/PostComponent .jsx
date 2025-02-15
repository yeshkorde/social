import Slider from "./sliders/Slider";
import getDatesAndTime from "../utils/GetDate";
import propTypes from "prop-types";
import { useState } from "react";
import LikeComponent from "./LikeCommentAndSaveComponennent/LikeComponent";
import CommentComponent from "./LikeCommentAndSaveComponennent/CommentComponent";
import ShareComponent from "./LikeCommentAndSaveComponennent/ShareComponent";
import SaveComponent from "./LikeCommentAndSaveComponennent/SaveComponent";
import useUserContext from "../hooks/UserContextHook";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

function PostComponent({ post }) {
  const [isReadMore, setisReadMore] = useState(false);
  const { userData } = useUserContext();

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.1,
      }}
      className="h-full w-full flex flex-col justify-center items-center gap-6 px-40 py-4  "
    >
      <div className="flex items-center w-full  justify-between px-10">
        <div className="flex justify-center items-center">
          <Link
            to={
              userData._id === post.user._id
                ? "/profile"
                : `userProfile?id=${post.user._id}`
            }
          >
            <div className="h-14 w-14 rounded-full">
              <img
                src={post.user.profileImage}
                alt=""
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </Link>
          <div className="flex flex-col ml-6">
            <p className="text-[12px] ibm-plex-sans-semibold">
              {post.user.userName}
            </p>
            <p className="text-[10px] text-[#505050]  dark:text-[#bbbbbb] ibm-plex-sans-semibold">
              followers {post.user.followers.length}
            </p>
          </div>
        </div>
        <p className="text-[10px]  text-[#505050] dark:text-[#bbbbbb] ibm-plex-sans-semibold">
          {getDatesAndTime(post.createdAt)}
        </p>
      </div>
      <Slider media={post.media} />
      <div className="flex justify-between items-center w-full px-20">
        <div className="flex flex-col gap-2 justify-start items-start w-full">
          <div className="flex justify-between items-center gap-6 w-full">
            <div className="flex gap-4">
              <LikeComponent likes={post.likes.length}/>
              <CommentComponent />
              <ShareComponent />
            </div>
            <SaveComponent />
          </div>
          <div>
            
            <p className="text-[16px] ibm-plex-sans-semibold ">
              <span className="text-[14px]">{post.user.userName} </span>
              {post.caption}
            </p>
            <p className=" ibm-plex-sans-semibold text-[12px] text-[#2b2b2b] dark:text-[#ededed] leading-relaxed tracking-widest mt-4">
              {post.discription?.toString().length > 50
                ? post.discription
                    .toString()
                    .substring(
                      0,
                      isReadMore ? post.discription?.toString().length : 50
                    )
                : post.discription}
              {post.discription?.toString().length > 100 && (
                <span
                  className="text-[#000] cursor-pointer dark:text-[#ffffff] ml-2"
                  onClick={() => setisReadMore((prev) => !prev)}
                >
                  {isReadMore ? <span>Close </span> : "Read More.........."}
                </span>
              )}
            </p>
         
          </div>
          <div className="flex w-full items-center gap-5 justify-center">
            <input
              type="text"
              placeholder="Add Comment"
              name=""
              id=""
              className="bg-transparent ibm-plex-sans-semibold text-[12px] py-2 outline-none border-b px-2 w-full dark:text-[#c4c4c4a1] text-[#171717a1]"
            />
            <button>Post</button>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] w-full border-gray-300 dark:border-[#171717] mx-20" />
    </motion.div>
  );
}

import PropTypes from "prop-types";

PostComponent.propTypes = {
  post: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.object),
    media: PropTypes.arrayOf(PropTypes.object),
    caption: PropTypes.string,
    likes: propTypes.arrayOf(PropTypes.object),
    user: PropTypes.shape({
      userName: PropTypes.string,
      profileImage: PropTypes.string,
      _id: PropTypes.string,
      followers: PropTypes.arrayOf(propTypes.object),
    }),
    createdAt: PropTypes.string,
    discription: PropTypes.string,
  }).isRequired,
};

export default PostComponent;
