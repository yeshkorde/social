import Slider from "./sliders/Slider";
import getDatesAndTime from "../utils/GetDate";
import propTypes from "prop-types";
import { useRef, useState } from "react";
import LikeComponent from "./LikeCommentAndSaveComponennent/LikeComponent";
import CommentComponent from "./LikeCommentAndSaveComponennent/CommentComponent";
import ShareComponent from "./LikeCommentAndSaveComponennent/ShareComponent";
import SaveComponent from "./LikeCommentAndSaveComponennent/SaveComponent";
import useUserContext from "../hooks/UserContextHook";
import { motion } from "motion/react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import UserHoverCard from "./UserHoverCard";

function PostComponent({ post }) {
  const { toast } = useToast();
  const [isReadMore, setisReadMore] = useState(false);
  const { userData } = useUserContext();
  const [isLoding, setisLoding] = useState(false);
  const triggerRef = useRef();
  const [comment, setcomment] = useState("");

  const handleCreateComment = async () => {
    try {
      setisLoding(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/comments/createComment`,
        {
          comment,
          postId: post._id,
        },
        {
          withCredentials: true,
        }
      );
      setcomment("");
      if (res.data.sucess) {
        toast({
          title: "commended sucessfully",
        });

        if(res.data.comments){
          post.comments = res.data.comments
        }

        if (res.data.error) {
          toast({
            title: res.data.error,
          });
        }
      }

      setisLoding(false);
    } catch (e) {
      setisLoding(false);
      toast({
        title: "internal server error",
      });
      e;
    }
  };

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
          <UserHoverCard
          trigger={  <div ref={triggerRef} className="h-16 w-16 dark:border-[#2b2b2b] shadow-[1px_1px_30px] shadow-[#dddddd]  dark:bg-black dark:border dark:shadow-[#000] rounded-full p-1">
          <img
            src={post.user.profileImage}
            alt=""
            className="h-full w-full rounded-full object-cover object-top"
          />
          
        </div>}
        userId={post.user._id}
          />
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
              <LikeComponent likes={post.likes} postId={post._id} />
              <CommentComponent comments={post.comments} />
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
              value={comment}
              placeholder="Add Comment"
              onChange={(e) => setcomment(e.target.value)}
              name=""
              id=""
              className="bg-transparent ibm-plex-sans-semibold text-[12px] py-2 outline-none border-b px-2 w-full dark:text-[#c4c4c4a1] text-[#171717a1]"
            />

           { isLoding?    <svg
            width="25"
            height="25"
            viewBox="0 0 414 400"
            className="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.1095 140.511C30.6168 137.977 22.435 141.988 20.4434 149.642C11.5565 183.799 11.8467 219.792 21.4116 253.942C30.9765 288.091 49.4239 318.998 74.76 343.57C80.438 349.076 89.5127 348.254 94.599 342.196V342.196C99.6854 336.139 98.8494 327.145 93.2377 321.571C72.283 300.756 57.0034 274.813 48.9937 246.216C40.984 217.619 40.5653 187.514 47.6595 158.843C49.5594 151.165 45.6023 143.045 38.1095 140.511V140.511Z"
              className="fill-blue-700"
            />
            <path
              d="M102.079 355.025C97.5012 361.789 99.4082 371.047 106.608 374.904C129.221 387.021 154.025 394.958 179.746 398.259C205.587 401.575 231.8 400.14 257.011 394.075C264.837 392.193 269.023 383.892 266.451 376.265V376.265C263.951 368.853 255.991 364.863 248.372 366.629C227.225 371.53 205.285 372.641 183.649 369.865C162.022 367.089 141.151 360.488 122.069 350.43C115.158 346.788 106.458 348.555 102.079 355.025V355.025Z"
              className="fill-blue-700"
              fillOpacity="0.8"
            />
            <path
              d="M280.981 371.747C284.071 378.922 292.348 382.367 299.385 378.976C327.14 365.603 351.428 346.373 370.451 322.719C375.641 316.266 373.713 306.878 366.741 302.408V302.408C360.075 298.135 351.269 299.972 346.263 306.106C330.646 325.24 310.982 340.938 288.59 352.147C281.359 355.767 277.782 364.321 280.981 371.747V371.747Z"
              className="fill-blue-700"
              fillOpacity="0.6"
            />
            <path
              d="M377.459 286.62C384.557 290.227 393.292 287.552 396.582 280.302C406.144 259.228 411.87 236.718 413.509 213.765C414.092 205.602 407.364 198.993 399.18 199.034V199.034C390.991 199.075 384.456 205.761 383.768 213.92C382.251 231.897 377.807 249.53 370.599 266.167C367.304 273.771 370.071 282.866 377.459 286.62V286.62Z"
              className="fill-blue-700"
              fillOpacity="0.4"
            />
            <path
              d="M398.399 184.26C406.589 183.586 412.725 176.362 411.376 168.255C409.742 158.438 407.353 148.751 404.229 139.277C401.72 131.67 393.251 128.079 385.779 130.964V130.964C378.051 133.948 374.361 142.696 376.825 150.604C378.898 157.256 380.55 164.022 381.772 170.868C383.205 178.891 390.275 184.928 398.399 184.26V184.26Z"
              className="fill-blue-700"
              fillOpacity="0.3"
            />
            <path
              d="M376.755 113.83C384.144 110.078 387.021 100.932 382.519 93.9743C380.617 91.0351 378.636 88.1442 376.579 85.3044C371.954 78.9215 362.964 78.012 356.756 82.868V82.868C350.245 87.9607 349.304 97.4042 354.036 104.182C354.926 105.458 355.798 106.744 356.653 108.042C361.03 114.693 369.655 117.434 376.755 113.83V113.83Z"
              className="fill-blue-700"
              fillOpacity="0.2"
            />
            <path
              d="M350.005 76.6945C356.257 71.3033 356.829 61.7622 350.792 56.1302C350.156 55.5368 349.516 54.9472 348.872 54.3617C343.082 49.0958 334.158 50.0175 329.097 55.9876L328.48 56.7144C323.508 62.5787 324.439 71.3719 330.066 76.611V76.611C335.429 81.6044 343.724 82.11 349.274 77.3247L350.005 76.6945Z"
              className="fill-blue-700"
              fillOpacity="0.1"
            />
          </svg>:
             comment ? (
              (
                <button className="text-blue-600" onClick={handleCreateComment}>
                  Post
                </button>
              )
            ) : (
              ""
            )
           }
          </div>
        </div>
      </div>
      <div className="border-b-[1px] w-full border-gray-300 dark:border-[#171717] mx-20" />
    </motion.div>
  );
}




PostComponent.propTypes = {
  post: PropTypes.shape({
    _id:propTypes.string,
    comments: PropTypes.arrayOf(propTypes.string),
    media: PropTypes.arrayOf(PropTypes.object),
    caption: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
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
