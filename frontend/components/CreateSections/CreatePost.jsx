import { ImageUp, X } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  const [files, setfiles] = useState([]);
  const [images, setimages] = useState([]);
  const [linkes, setlinkes] = useState([]);
  const [isLoding, setisLoding] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef();
  const navigate = useNavigate();

  const [textDta, settextDta] = useState({
    title: "",
    discription: "",
  });

  const [videoDuration, setvideoDuration] = useState("");

  const handleGetImages = (e) => {
    if (images.length >= 6) {
      toast({
        title: "we are only accepts 6 media files",
      });
      inputRef.current.value = "";
      return;
    }

    if (e.target.files[0].type.startsWith("video/")) {
      if (videoDuration > 35.0) {
        toast({
          title:
            "the video is to long we are supporting only 20s videos not grater then that",
        });
        inputRef.current.value = "";
        return;
      }
    }

    if (e.target.files[0].size >= 10000000) {
      toast({
        title: "the file size is to big",
      });
      inputRef.current.value = "";
      return;
    }

    if (
      !e.target.files[0].type.startsWith("video/") &&
      !e.target.files[0].type.startsWith("image/")
    ) {
      toast({
        title: "invalid File type we are only allowing images and videos",
      });
      inputRef.current.value = "";
      return;
    }

    let url = URL.createObjectURL(e.target.files[0]);

    let file = e.target.files[0];

    setfiles((prev) => [...prev, file]);

    let data = {
      type: e.target.files[0].type.startsWith("video/") ? "video" : "image",
      url,
    };

    setimages((prev) => [...prev, data]);
    inputRef.current.value = "";
  };

  const handleDelete = (id) => {
    const deletedimages = images.filter((img, ind) => ind !== id);
    setimages(deletedimages);
    const deletedFile = files.filter((img, ind) => ind !== id);
    setfiles(deletedFile);
  };

  const handleDeleteLink = (id) => {
    const deletedLinkes = linkes.filter((img, ind) => ind !== id);
    setlinkes(deletedLinkes);
  };

  const handleLiknks = () => {
    if (linkes.length >= 4) {
      toast({
        title: "you can only add 4 linkes",
      });
      return;
    }
    setlinkes((prev) => [...prev, { name: "", url: "" }]);
  };

  const handlePost = async () => {
    try {
      setisLoding(true);
      let formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      formData.append("text", JSON.stringify(textDta));
      formData.append("linkes", JSON.stringify(linkes));
      setisLoding(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/post/createPost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setfiles([]);
      setimages([]);
      settextDta({ title: "", discription: "" });
      setlinkes([]);
      if (res.data.sucess) {
        navigate("/profile");
        toast({
          title: "post created sucessfully",
        });
      }
      setisLoding(false);
    } catch (error) {
      toast({
        title: "internal server error",
      });
      console.log(error);
      setisLoding(true);
    }
  };

  return (
    <div className="h-full w-full">
      {isLoding ? (
        <div className=" w-full h-60  flex flex-col justify-center  items-center rounded-3xl dark:bg-black bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border dark:shadow-black">
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
        <div className=" w-full   flex flex-col justify-center  items-center rounded-3xl dark:bg-black bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border dark:shadow-black">
          <div className="  w-full flex justify-center items-center py-10 flex-wrap gap-4 relative">
            {images.map((img, ind) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -50,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mb-4  rounded-lg relative flex flex-col justify-center items-center"
                  key={ind}
                >
                  {img.type === "image" ? (
                    <img
                      src={img.url}
                      alt="Placeholder"
                      className="max-h-80  object-cover rounded-xl"
                    />
                  ) : (
                    <video
                      className="max-h-80 object-cover rounded-xl"
                      controls={true}
                      style={{ aspectRatio: "9/16" }}
                      src={img.url}
                      onLoadedMetadata={(e) => {
                        setvideoDuration(e.target.duration);
                      }}
                    >
                      <source src={img.url} />
                    </video>
                  )}
                  <motion.div
                    whileTap={{
                      scale: 0.7,
                    }}
                    className="h-6 w-6 bg-[#222] rounded-full absolute bottom-[-15px] dark:bg-white  flex justify-center items-center cursor-pointer"
                    onClick={() => handleDelete(ind)}
                  >
                    <X size={20} className="text-white dark:text-black " />
                  </motion.div>
                </motion.div>
              );
            })}
            <motion.div
              transition={{
                ease: "easeInOut",
                duration: 0.3,
              }}
              whileTap={{
                scale: 0.8,
              }}
              className="h-14 w-14 rounded-full bg-[#111] group flex justify-center items-center relative dark:bg-white cursor-pointer"
              onClick={() => inputRef.current.click()}
            >
              <ImageUp className="text-white dark:text-black absolute  " />

              <input
                type="file"
                name=""
                id=""
                ref={inputRef}
                hidden
                onChange={(e) => handleGetImages(e)}
              />
            </motion.div>
            <p className="absolute top-0 right-0 mx-8 mt-5 text-[12px] text-[#1b1b1b]  ibm-plex-sans-medium dark:text-[#d9d9d9]">
              {images.length}/6
            </p>
          </div>
          <div className="   mb-10 mt-10 flex flex-col ">
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex flex-col">
                <label className=" ibm-plex-sans-medium text-sm" htmlFor="">
                  Title
                </label>
                <input
                  value={textDta.title}
                  type="text"
                  onChange={(e) =>
                    settextDta((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-[800px] h-10 outline-none text-[12px]   bg-transparent border-b border-[#bababa] dark:border-[#282828] px-2 "
                  name=""
                  id=""
                />
              </div>
              <div className="w-full flex flex-col  mt-4">
                <label className=" ibm-plex-sans-medium text-sm" htmlFor="">
                  Discription
                </label>
                <textarea
                  type="text"
                  className=" h-10 text-[12px] mt-2 outline-none scrollHidden  bg-transparent border-b border-[#bababa] dark:border-[#282828] px-2 resize-none overflow-y-scroll"
                  name=""
                  value={textDta.discription}
                  id=""
                  onChange={(e) =>
                    settextDta((prev) => ({
                      ...prev,
                      discription: e.target.value,
                    }))
                  }
                />
              </div>
              {linkes.map((link, ind) => (
                <div className="flex gap-4 mt-4" key={ind}>
                  <div className="w-full flex flex-col">
                    <label
                      className="ibm-plex-sans-semibold text-[14px]"
                      htmlFor=""
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-8 text-[12px] outline-none   bg-transparent border-b  px-4  border-[#bababa] dark:border-[#282828]"
                      name=""
                      id=""
                      onChange={(e) => {
                        const updatedLinkes = linkes.map((link, index) =>
                          index === ind
                            ? { ...link, name: e.target.value }
                            : link
                        );
                        setlinkes(updatedLinkes);
                      }}
                    />
                  </div>
                  <div className="w-full flex flex-col ">
                    <motion.label
                      className="ibm-plex-sans-semibold text-[14px]"
                      htmlFor=""
                    >
                      Link
                    </motion.label>

                    <input
                      type="text"
                      className="w-full h-8  outline-none text-[12px]   bg-transparent border-b border-[#bababa] dark:border-[#282828] px-4"
                      name=""
                      id=""
                      onChange={(e) => {
                        const updatedLinkes = linkes.map((link, index) =>
                          index === ind
                            ? { ...link, url: e.target.value }
                            : link
                        );
                        setlinkes(updatedLinkes);
                      }}
                    />
                  </div>
                  <div
                    onClick={() => handleDeleteLink(ind)}
                    className="h-5 w-[40px] mt-10 bg-[#222] rounded-full  bottom-[-15px] dark:bg-white  flex justify-center items-center cursor-pointer"
                  >
                    <X size={15} className="text-white dark:text-black " />
                  </div>
                </div>
              ))}
              <div className="w-full flex mt-4 group">
                <motion.button
                  whileHover={{
                    rotateX: 20,
                    rotateY: 20,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="px-6 py-2 rounded-xl dark:bg-[#0a0a0a] text-[12px] ibm-plex-sans-semibold bg-[#eeeeee] "
                  onClick={handleLiknks}
                >
                  Add Links
                </motion.button>
              </div>

              <p className="mb-10 text-[10px] dark:text-[#717171] text-[#1e1e1e] ibm-plex-sans-medium">
                You have to add the title and discription to post{" "}
              </p>
              {!textDta.discription || !textDta.title ? (
                ""
              ) : (
                <button
                  className="h-10 w-full dark:bg-white bg-black dark:text-black relative flex items-center justify-center rounded-2xl mt-4 ibm-plex-sans-semibold text-white "
                  onClick={handlePost}
                >
                  <p className="z-10">Post</p>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
