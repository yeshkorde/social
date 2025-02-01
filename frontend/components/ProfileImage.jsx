import useUserContext from "../hooks/UserContextHook";
import { useRef } from "react";
import gsap from "gsap";


function ProfileImage({ isProfileChange}) {

  const { userData} = useUserContext();
  const changeProfileImageRef = useRef();

  const handleMouseEnter = () => {
    changeProfileImageRef.current.classList.remove("hidden");
    gsap.from(".editIcon", {
      opacity: 0,
      scale: 0,
      ease: "power4.inOut",
      duration: 0.3,
    });
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



  return (
    <div
      className="h-72 w-72 profileImage rounded-full dark:border dark:border-[#2b2b2b] shadow-[3px_3px_30px] shadow-[#e6e6e6] flex justify-center items-center  p-1 dark:shadow-[#000] relative "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => changeProfileImageRef.current.classList.add("hidden")}
    >
      <img
        src={userData.profileImage}
        onLoad={(e) => hnadleLode(e)}
        alt=""
        className="h-full w-full object-cover rounded-full absolute"
      />
      <div
        ref={changeProfileImageRef}
        className="h-full w-full rounded-full absolute bg-black/20 hidden flex justify-center object-to items-center"
      >
          <div
            className="h-10 w-10 rounded-full bg-white flex justify-center items-center editIcon cursor-pointer dark:bg-black dark:border dark:border-[#fff]"
            onClick={()=>isProfileChange(true)}
          >
            <svg
              height="18px"
              width="18px"
              className="fill-[#000] dark:fill-[#fff]"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 306.637 306.637"
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
			l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"
                  />
                  <path
                    d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
			L265.13,75.602L231.035,41.507z"
                  />
                </g>
              </g>
            </svg>
          </div>
      </div>
    </div>
  );
}

export default ProfileImage;
