import { useState } from "react";
import { Plus, X, Folder } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import useUserContext from "../hooks/UserContextHook";

function SavedSection() {
  const [isCreateFolderOn, setisCreateFolderOn] = useState(false);
  const [folderName, setfolderName] = useState("");
  const [error, seterror] = useState("");
  const [isLoding, setisLoding] = useState(false);
  const { toast } = useToast();
  const { userData, setuserData } = useUserContext();

  const handlFolderCreation = async () => {
    try {
      if (!folderName) {
        return seterror("folderName is Requirde");
      }
      setisLoding(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/folder/createFolder`,
        { folderName },
        {
          withCredentials: true,
        }
      );

      setfolderName(" ");

      if (res.data.success) {
        setuserData(res.data.currentUser);
        return toast({
          title: res.data.message,
        });
      }

      if (res.data.error) {
        return toast({
          title: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.message);
      setisLoding(false);
    }
  };

  return (
    <div className="px-10 h-full w-full relative">
      <div
        className={`h-80 w-full absolute top-0 flex justify-center translate-y-[-200px]  items-center  ${
          isCreateFolderOn ? "block" : "hidden"
        }`}
      >
        {isLoding ? (
          <div className=" w-40 h-40  flex flex-col justify-center  items-center rounded-3xl  bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6] dark:bg-[#090909]  dark:shadow-black">
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
          <div
            className={` py-4 w-80 px-4 bg-[#ffffff] dark:bg-[#090909] dark:shadow-[#000] shadow-[2px_2px_20px] shadow-[#dddddd] rounded-xl ${
              isCreateFolderOn ? "block" : "hidden"
            }`}
          >
            <div className="flex justify-end p-2">
              <X
                size={20}
                className="dark:text-white text-black cursor-pointer"
                onClick={() => setisCreateFolderOn(false)}
              />
            </div>
            <label
              htmlFor="folder name"
              className="text-black ml-2 ibm-plex-sans-semibold text-[12px] dark:text-white "
            >
              Folder Name
            </label>
            <input
              onChange={(e) => setfolderName(e.target.value)}
              type="text"
              name=""
              value={folderName}
              id=""
              className="h-10 w-full rounded-lg mt-2 dark:border-[#303030] outline-none px-2 bg-transparent border border-[#d7d7d7]"
            />
            {error ? (
              <p className="text-[10px] text-center mt-2 text-red-500 ibm-plex-sans-medium">
                {error}
              </p>
            ) : (
              ""
            )}
            <button
              onClick={handlFolderCreation}
              className="w-full px-4 py-2 bg-black mt-2 ibm-plex-sans-semibold rounded-xl text-white dark:bg-white dark:text-black dark:shadow-[2px_2px_30px] dark:hover:shadow-[#8a8a8a] dark:shadow-[#000] shadow-[#8a8a8a]"
            >
              Create
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="px-4 w py-2 bg-black justify-between relative flex  items-center dark:bg-white text-white dark:text-black rounded-xl text-sm ibm-plex-sans-semibold dark:shadow-[2px_2px_30px] dark:hover:shadow-[#8a8a8a] dark:shadow-[#000] shadow-[#8a8a8a]"
          onClick={() => setisCreateFolderOn(true)}
        >
          Add Folder
          <Plus size={20} className="ml-5" />
        </button>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4  space-y-4">
        {userData.saved?.map((post, index) =>
          post.isFolder ? (
            <div
              className="w-40 py-5 shadow-[2px_2px_60px] shadow-[#d7d7d7] dark:shadow-[#000] dark:shadow-[1px_1px_20px] cursor-pointer dark:hover:shadow-[#cccccc] flex justify-center items-center rounded-xl bg-white"
              key={index}
            >
              <div className="flex items-center justify-center bg-[#000000] p-3 rounded-md shadow-md">
                <Folder className="text-[#ffffff] w-6 h-6" />
                <p className="ml-4 text-sm ibm-plex-sans-semibold text-[#ffffff] font-semibold truncate">
                {post.folderName}
              </p>
              </div>

             
            </div>
          ) : (
            <div
              key={index}
              className="break-inside-avoid overflow-hidden rounded-xl shadow-md"
            >
              {post?.media?.length > 0 && post.media[0].type !== "image" ? (
                <video
                  className="w-full h-auto object-cover rounded-lg"
                  onLoadedMetadata={(e) => (e.target.currentTime = 0.1)}
                >
                  <source src={post?.media[0].url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={post?.media[0].url}
                  alt={`Post ${index}`}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SavedSection;
