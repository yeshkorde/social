import Slider from "./sliders/Slider";
import getDatesAndTime from "../utils/GetDate";
import propTypes, { number } from "prop-types";
import { useState } from "react";

function PostComponent({ post }) {
  const [isReadMore, setisReadMore] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-6 px-40 py-4  ">
      <div className="flex items-center w-full  justify-between px-10">
        <div className="flex justify-center items-center">
          <div className="h-14 w-14 rounded-full">
            <img
              src={post.user.profileImage}
              alt=""
              className="h-full w-full rounded-full object-cover object-top"
            />
          </div>
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
              <svg
                aria-label="Like"
                className="x1lliihq x1n2onr6 xyb1xck"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Like</title>
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
              </svg>
              <svg
                aria-label="Comment"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Comment</title>
                <path
                  d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              <svg
                aria-label="Share"
                className="x1lliihq x1n2onr6 xyb1xck"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Share</title>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                ></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
            </div>
            <svg
              aria-label="Save"
              className="x1lliihq x1n2onr6 x5n08af"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Save</title>
              <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
          </div>
          <div>
            <p className="ibm-plex-sans-semibold text-[12px]">
              Likes {post.likes.length}
            </p>
            <p className="text-[16px] ibm-plex-sans-semibold ">
              <span className="text-[14px]">{post.user.userName} </span>
              {post.caption}
            </p>
            <p className=" ibm-plex-sans-semibold text-[12px] text-[#2b2b2b] dark:text-[#ededed] leading-relaxed tracking-widest mt-4">
              {post.discription.toString().length > 50
                ? post.discription
                    .toString()
                    .substring(
                      0,
                      isReadMore ? post.discription.toString().length : 50
                    )
                : post.discription}
              {post.discription.toString().length > 100 && (
                <span
                  className="text-[#000] cursor-pointer dark:text-[#ffffff] ml-2"
                  onClick={() => setisReadMore((prev) => !prev)}
                >
                  {isReadMore ? <span>Close </span> : "Read More.........."}
                </span>
              )}
            </p>
            <p className=" dark:text-[#c4c4c4a1] text-[#171717a1]  ibm-plex-sans-semibold text-[12px] mt-2">
              View All {post.comments.length} Comments
            </p>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] w-full border-gray-300 dark:border-[#171717] mx-20" />
    </div>
  );
}

PostComponent.propTypes = {
  post: propTypes.shape({
    comments: propTypes.shape({
      length: number,
    }),
    media:propTypes.shape,
    caption:propTypes.string,
    likes: propTypes.shape({
      length: number,
    }),
    user: propTypes.shape({
      userName: propTypes.string,
      profileImage: propTypes.string,
      caption: propTypes.string,

      followers: propTypes.shape({
        length: propTypes.number,
      }),
    }),
    createdAt: propTypes.string,
    discription: propTypes.string,
  }).isRequired,
};

export default PostComponent;
