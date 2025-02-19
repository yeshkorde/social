import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import Slide from "./Slide";

function Slider({ media }) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });




  const handleLoad = (e) => {
    const mediaElement = e.target;
    const isImage = mediaElement.tagName === "IMG";
    const { videoWidth, videoHeight, naturalWidth, naturalHeight } =
      mediaElement;

    const width = isImage ? naturalWidth : videoWidth;
    const height = isImage ? naturalHeight : videoHeight;
    const aspectRatio = width / height;

    let newWidth, newHeight;

    if (height > 700) {
      newHeight = 700;
      newWidth = newHeight * aspectRatio;
    } else {
      newHeight = height;
      newWidth = width;
    }

    if (newWidth > 1000) {
      newWidth = 750;
      newHeight = newWidth / aspectRatio;
    }

    setImageDimensions({
      width: newWidth,
      height: newHeight,
    });

    mediaElement.style.width = `${newWidth}px`;
    mediaElement.style.height = `${newHeight}px`;
    mediaElement.style.objectFit = "cover";
  };


  return (
    <Swiper
      cssMode={true}
      navigation={true}
      pagination={{ clickable: true }}
      mousewheel={true}
      keyboard={true}
      modules={[Navigation, Pagination, Mousewheel, Keyboard]}
      className="mySwiper"
      style={{
        width: imageDimensions.width ? `${imageDimensions.width}px` : "100%",
        height: imageDimensions.height ? `${imageDimensions.height}px` : "100%",
      }}
    >
      {media?.map((m, ind) => {
        return (
          <SwiperSlide
            key={ind}
            className={`flex items-center justify-center  object-cover cursor-pointer${
              m.type === "image" ? "" : " max-h-[700px]"
            }`}
          >
         <Slide url={m.url} onlode={handleLoad} type={m.type} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}


Slider.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["image", "video"]).isRequired,
    })
  ).isRequired,
};

export default Slider;
