import { useInView,motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useComponentContext from "../../hooks/ComponentContextHook";
import { Volume2, VolumeOff } from "lucide-react";
import PropTypes from "prop-types";


function Slide({url,type,onlode}) {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { threshold: 0.5 });
  const {isMuted,setisMuted} = useComponentContext()

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isInView]);


  
  const toggleMute = () => {
    setisMuted((prev)=>!prev)
   };


   

  return  type === "image" ? (
    <img
      src={url}
      alt="Media"
      className="w-full h-auto rounded-xl"
      onLoad={onlode}
    />
  ) : (
    <div className="relative">
      <motion.video
        loop
        playsInline
        className="w-full max-h-[700px] rounded-xl"
        ref={videoRef}
        muted={isMuted}
        onLoadedData={onlode}
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      <div
        className="h-full w-full absolute bg-transparent top-0 p-2 flex justify-end"
        onClick={toggleMute}
      >
        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center cursor-pointer">
      {
        isMuted ? <VolumeOff  className="text-white" size={15}/> :<Volume2 className="text-white" size={15}/>
      }
        </div>
      </div>
    </div>
  )}


  Slide.propTypes = {
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["image", "video"]).isRequired,
    onlode: PropTypes.func.isRequired,
  };

export default Slide;
