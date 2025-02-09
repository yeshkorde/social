import { ImageUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";

function CreatePost() {
  const [files, setfiles] = useState([]);
  const [images, setimages] = useState([]);
const [linkes, setlinkes] = useState([])

  const { toast } = useToast();
  const inputRef = useRef();
 

  const [textDta, settextDta] = useState({
    title: "",
    discription: "",
  });
  const [videoDuration, setvideoDuration] = useState("");

  const handleGetImages = (e) => {
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
  };


  const handleDeleteLink = (id) =>{
    const deletedLinkes = linkes.filter((img, ind) => ind !== id);
    setlinkes(deletedLinkes);
  }




  return (
    <div className=" w-full   flex flex-col justify-center  items-center rounded-3xl dark:bg-black bg-white shadow-[3px_3px_30px] shadow-[#e6e6e6]  dark:border dark:shadow-black">
      <div className="  w-full flex justify-center items-center py-10 flex-wrap gap-4 relative">
        {images.map((img, ind) => {
          return (
            <div
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
              <div
                className="h-6 w-6 bg-[#222] rounded-full absolute bottom-[-15px] dark:bg-white  flex justify-center items-center cursor-pointer"
                onClick={() => handleDelete(ind)}
              >
                <X size={20} className="text-white dark:text-black " />
              </div>
            </div>
          );
        })}
        <div
          className="h-14 w-14 rounded-full bg-[#111] flex justify-center items-center dark:bg-white cursor-pointer"
          onClick={() => inputRef.current.click()}
        >
          <ImageUp className="text-white dark:text-black" />

          <input
            type="file"
            name=""
            id=""
            ref={inputRef}
            hidden
            onChange={(e) => handleGetImages(e)}
          />
        </div>
        <p className="absolute top-0 right-0 mx-8 mt-5 text-[12px] text-[#1b1b1b] ibm-plex-sans-semibold dark:text-[#d9d9d9]">
          {images.length}/6
        </p>
      </div>
      <div className="   mb-10 mt-10 flex flex-col ">
     
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col">
            <label className="ibm-plex-sans-semibold" htmlFor="">Title</label>
            <input
               type="text"
               onChange={(e) =>settextDta((prev)=>({...prev,title:e.target.value}))} 
              className="w-[800px] h-10 outline-none   bg-transparent border-b border-[#3e3e3e] p-4 mt-4"
              name=""
              id=""
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="ibm-plex-sans-semibold" htmlFor="">Discription</label>
            <textarea
              type="text"
              className=" h-auto outline-none scrollHidden  bg-transparent border-b border-[#3e3e3e] p-4 mt-4 resize-none overflow-y-scroll"
              name=""
              id=""
              onChange={(e)=>settextDta((prev)=>({...prev,discription:e.target.value}))}
            />
          </div>
         {
        linkes.map((link,ind)=>(
             <div className="flex gap-4 mt-4" key={ind}>
          <div className="w-full flex flex-col">
            <label className="ibm-plex-sans-semibold text-[14px]" htmlFor="">name</label>
            <input
               type="text"
              className="w-full h-8  outline-none   bg-transparent border-b border-[#3e3e3e] p-4 mt-4"
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
          <div className="w-full flex flex-col">
            <label className="ibm-plex-sans-semibold text-[14px]" htmlFor="">Link</label>
            <input
               type="text"
               
              className="w-full h-8  outline-none   bg-transparent border-b border-[#3e3e3e] p-4 mt-4"
              name=""
              id=""
              onChange={(e) => {
                const updatedLinkes = linkes.map((link, index) => 
                  index === ind
                    ? { ...link,url: e.target.value }
                    : link
                );
                setlinkes(updatedLinkes);
              }}
            />
          </div>
          <div
          onClick={()=>handleDeleteLink(ind)}
                className="h-6 w-[50px] mt-10 bg-[#222] rounded-full  bottom-[-15px] dark:bg-white  flex justify-center items-center cursor-pointer">
                <X size={20} className="text-white dark:text-black " />
              </div>
          </div>
          ))
         }
          <div className="w-full flex ">
          <button className="px-6 py-2 rounded-xl dark:bg-[#343434] text-[12px] ibm-plex-sans-semibold bg-[#dfdfdf] "  onClick={()=>setlinkes((prev)=>[...prev,{name:"",url:""}])}>Add Links</button>
          </div>
        
          <p className="mb-10 text-[10px] dark:text-[#c4c4c4] text-[#1e1e1e]">You have to  add the title and discription to post </p>
         {
          !textDta.discription || !textDta.title?"": <button className="h-10 w-full bg-blue-600 rounded-2xl mt-10">Post</button>
         }
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
