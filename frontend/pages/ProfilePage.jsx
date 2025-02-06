import useComponentContext from "../hooks/ComponentContextHook";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProfileImage from "../components/ProfileImage";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import useUserContext from "../hooks/UserContextHook";
import axios from "axios";

function ProfilePage() {
  const [isProfileChangeOn, setisProfileChangeOn] = useState(false);

const [isLoding, setisLoding] = useState(false)
  const { isOn } = useComponentContext();
  const { userData } = useUserContext();
  const ProfileChangeRef = useRef();
  const fileRef = useRef();
  const { toast } = useToast();
  const { setuserData } = useUserContext();

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power4.inOut" },
    });

    tl.from(".box", {
      x: 1000,
      opacity: 0,
      rotate: 15,
      ease: "back.out(1.7)",
    })
      .from(
        ".profileImage",
        {
          scale: 0,
          opacity: 0,
          rotate: 360,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.5"
      )
      .from(
        ".profileData",
        {
          y: -40,
          opacity: 0,
          stagger: 0.2,
          ease: "sine.out",
        },
        "-=0.3"
      )
      .from(
        ".editBtn",
        {
          scale: 0,
          opacity: 0,
          rotate: -15,
          ease: "back.out(1.5)",
        },
        "-=0.3"
      )
      .to(".editBtn", {
        scale: 1.1,
        repeat: 1,
        yoyo: true,
        duration: 0.3,
        ease: "power1.inOut",
      });
  });

  useEffect(() => {
    if (isProfileChangeOn) {
      ProfileChangeRef.current.classList.remove("hidden");
    } else {
      ProfileChangeRef.current.classList.add("hidden");
    }
  }, [isProfileChangeOn]);


  const handleProfileImageRemove = async()=>{
  try {
    setisLoding(true)
    const res = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/api/user/UpdateProfileImage?q=remove`,null,{
      withCredentials:true
    })
    
    if (res.data.sucess) {
      setuserData(res.data.currentuser);
      setisProfileChangeOn(false);
      toast({
        title: "Profile Image Removed SucessFully",
      });
    }
    setisLoding(false);
  } catch (error) {
    console.log(
      "Something went wrong while removing profile image:",
      error.message
    );
  }
}

useEffect(()=>{
  if(isProfileChangeOn){
  //  const tl = gsap.timeline();

  }
},[isProfileChangeOn])


  const handleProfileImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        return toast({
          variant: "destructive",
          title: "File Not Found",
          description: "Try again later",
        });
      }
      const formData = new FormData();
      formData.append("file", file);
      setisLoding(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/user/UpdateProfileImage?q=update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        withCredentials:true,
        }
      );
      if (res.data.sucess) {
        setuserData(res.data.currentuser);
        setisProfileChangeOn(false);
        toast({
          title: "Profile Image Updated SucessFully",
        });
      }
      setisLoding(false);
      e.target.value = "";
    } catch (error) {
      e.target.value = "";
      console.log(
        "Something went wrong while changing profile image:",
        error.message
      );
    }
  };

 


  return (
    <div className={`h-full relative ${
          isOn.isNotificationOn || isOn.isSearchOn ? "-z-[3]" : ""
        }  w-[500%] `}>
      <div
        className="h-[710px] w-full absolute bg-white/60 dark:bg-black/60 z-30 flex justify-center items-center hidden p-4"
        ref={ProfileChangeRef}
      >
        <div className="h-52 rounded-2xl w-1/3 bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border  dark:bg-black dark:shadow-[#000]">
         
          <div className="px-8 py-4 h-1/2 flex flex-col justify-center gap-4 items-center">
            {isLoding ? (
              <div className="h-full w-full flex justify-center items-center pt-20">
                <svg
                width="40"
                height="40"
                viewBox="0 0 414 400"

                className="animate-spin"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.1095 140.511C30.6168 137.977 22.435 141.988 20.4434 149.642C11.5565 183.799 11.8467 219.792 21.4116 253.942C30.9765 288.091 49.4239 318.998 74.76 343.57C80.438 349.076 89.5127 348.254 94.599 342.196V342.196C99.6854 336.139 98.8494 327.145 93.2377 321.571C72.283 300.756 57.0034 274.813 48.9937 246.216C40.984 217.619 40.5653 187.514 47.6595 158.843C49.5594 151.165 45.6023 143.045 38.1095 140.511V140.511Z"
                 className="fill-black dark:fill-white"
                />
                <path
                  d="M102.079 355.025C97.5012 361.789 99.4082 371.047 106.608 374.904C129.221 387.021 154.025 394.958 179.746 398.259C205.587 401.575 231.8 400.14 257.011 394.075C264.837 392.193 269.023 383.892 266.451 376.265V376.265C263.951 368.853 255.991 364.863 248.372 366.629C227.225 371.53 205.285 372.641 183.649 369.865C162.022 367.089 141.151 360.488 122.069 350.43C115.158 346.788 106.458 348.555 102.079 355.025V355.025Z"
                      className="fill-black dark:fill-white"
                  fillOpacity="0.8"
                />
                <path
                  d="M280.981 371.747C284.071 378.922 292.348 382.367 299.385 378.976C327.14 365.603 351.428 346.373 370.451 322.719C375.641 316.266 373.713 306.878 366.741 302.408V302.408C360.075 298.135 351.269 299.972 346.263 306.106C330.646 325.24 310.982 340.938 288.59 352.147C281.359 355.767 277.782 364.321 280.981 371.747V371.747Z"
                      className="fill-black dark:fill-white"
                  fillOpacity="0.6"
                />
                <path
                  d="M377.459 286.62C384.557 290.227 393.292 287.552 396.582 280.302C406.144 259.228 411.87 236.718 413.509 213.765C414.092 205.602 407.364 198.993 399.18 199.034V199.034C390.991 199.075 384.456 205.761 383.768 213.92C382.251 231.897 377.807 249.53 370.599 266.167C367.304 273.771 370.071 282.866 377.459 286.62V286.62Z"
                        className="fill-black dark:fill-white"
                  fillOpacity="0.4"
                />
                <path
                  d="M398.399 184.26C406.589 183.586 412.725 176.362 411.376 168.255C409.742 158.438 407.353 148.751 404.229 139.277C401.72 131.67 393.251 128.079 385.779 130.964V130.964C378.051 133.948 374.361 142.696 376.825 150.604C378.898 157.256 380.55 164.022 381.772 170.868C383.205 178.891 390.275 184.928 398.399 184.26V184.26Z"
                        className="fill-black dark:fill-white"
                  fillOpacity="0.3"
                />
                <path
                  d="M376.755 113.83C384.144 110.078 387.021 100.932 382.519 93.9743C380.617 91.0351 378.636 88.1442 376.579 85.3044C371.954 78.9215 362.964 78.012 356.756 82.868V82.868C350.245 87.9607 349.304 97.4042 354.036 104.182C354.926 105.458 355.798 106.744 356.653 108.042C361.03 114.693 369.655 117.434 376.755 113.83V113.83Z"
                        className="fill-black dark:fill-white"
                  fillOpacity="0.2"
                />
                <path
                  d="M350.005 76.6945C356.257 71.3033 356.829 61.7622 350.792 56.1302C350.156 55.5368 349.516 54.9472 348.872 54.3617C343.082 49.0958 334.158 50.0175 329.097 55.9876L328.48 56.7144C323.508 62.5787 324.439 71.3719 330.066 76.611V76.611C335.429 81.6044 343.724 82.11 349.274 77.3247L350.005 76.6945Z"
                        className="fill-black dark:fill-white"
                  fillOpacity="0.1"
                />
              </svg>
              </div>
            ) : (
              
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
              onClick={() => setisProfileChangeOn(false)}
            >
              <path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"></path>
            </svg>
          </div>
                <button className="py-2 px-6 w-full rounded-xl border ibm-plex-sans-semibold " onClick={()=>handleProfileImageRemove()}>
                  Remove Profile Image
                </button>
                <button
                  className="py-2 px-6 rounded-xl border ibm-plex-sans-semibold w-full"
                  onClick={() => fileRef.current.click()}
                >
                  Change Profile Image
                </button>
                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={(e) => handleProfileImageChange(e)}
                />{" "}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`h-full w-full bg-white shadow-lg dark:border dark:border-[#2b2b2b]   dark:bg-[#000000]  rounded-2xl p-10 overflow-hidden relative`}
      >
        <div className="h-80 w-full box bg-[#ffffff] dark:bg-[#000]  rounded-3xl relative overflow-hidden shadow-[3px_3px_30px] shadow-[#e6e6e6] dark:shadow-[#000]">
          <div className="h-full  bg-[#fff] w-full dark:bg-black dark:border dark:border-[#2b2b2b] absolute rounded-3xl items-center flex p-6   gap-10">
            <ProfileImage isProfileChange={setisProfileChangeOn} />
            <div className="p-10 h-full w-1/2 flex flex-col gap-2 ">
              <p className="ibm-plex-sans-semibold profileData text-2xl text-[#1f1f1f] dark:text-white">
                {userData.userName}
              </p>
              <p className="ibm-plex-sans-semibold profileData text-md text-[#2e2e2e] dark:text-white">
                {userData.name}
              </p>
              <p className="ibm-plex-sans-semibold profileData text-md text-[#2e2e2e] dark:text-white">
                {userData.bio ? userData.bio : "No Bio "}
              </p>
              <p className="ibm-plex-sans-semibold profileData text-md text-[#2e2e2e] dark:text-white">
                {userData.email}
              </p>
              <div className="flex mt-2 gap-4">
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e] dark:text-white">
                  Followers {userData.followers.length}
                </p>
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e] dark:text-white">
                  Following {userData.following.length}
                </p>
                <p className="ibm-plex-sans-semibold profileData text-sm text-[#2e2e2e]  dark:text-white">
                  postes {userData.postes.length}
                </p>
              </div>
              <button className="px-3 py-1 bg-black editBtn dark:bg-white dark:text-black cursor-pointer  w-20 mt-4 ibm-plex-sans-semibold text-white rounded-full">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
