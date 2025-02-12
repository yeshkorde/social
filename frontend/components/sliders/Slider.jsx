import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";



function Slider({ media }) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  const [activeSlide, setactiveSlide] = useState('')

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
      newWidth = 1000;
      newHeight = newWidth / aspectRatio;
    }

    setImageDimensions({
      width: newWidth,
      height: newHeight,
    });

    mediaElement.style.width = `${newWidth}px`;
    mediaElement.style.height = `${newHeight}px`;
    mediaElement.style.objectFit = "contain";
  };


  console.log(activeSlide);
  

  return (
    <Swiper
      cssMode={true}
      onSlideChange={(swiper)=>setactiveSlide(swiper.activeIndex)}
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
      {media?.map((m, ind) => (
        <SwiperSlide
          key={ind}
          className={`flex items-center justify-center ${
            m.type === "image" ? "" : "w-80 max-h-[700px]"
          }`}
        >
          {m.type === "image" ? (
            <img
              src={m.url}
              alt="Media"
              className="w-full h-auto rounded-xl"
              onLoad={handleLoad}
            />
          ) : (
            <video
              className="w-full max-h-[700px] object-contain rounded-xl"
            
              onLoadedData={handleLoad}
            >
              <source src={m.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
