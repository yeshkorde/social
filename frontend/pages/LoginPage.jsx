import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import images from "../utils/imsges";
import { useEffect,useRef,useState } from "react";
import useModecontext from "../hooks/ModeContextHook";

function LoginPage() {
  const { mode, toggleMode } = useModecontext();
  const lightRef = useRef(null);
  const darkRef = useRef(null);
  const [changedImages, setchangedImages] = useState()

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".sociallogo", {
      y: -20,
      stagger: 0.1,
      opacity: 0,
    });

    tl.from(".google", {
      y: 300,
      duration: 0.4,
      opacity: 0,
      rotateX: 360,
      backgroundColor: "black",
    });

    tl.to(".google", {
      width: 350,
      duration: 0.4,
      opacity: 1,
    });
    tl.from(".googleLogo", {
      y: -15,
      opacity: 0,
      duration: 0.2,
    });
    tl.from(".googleText", {
      x: 40,
      opacity: 0,
      ease: "circ.inOut",
    });

    tl.from(".social", {
      x: -20,
      opacity: 0,
      stagger: 0.2,
    });
  });

  const updateImages = () => {
    let arr = [];
    for(let i = 0 ;i<=50 ; i++){
      let randomImages = images[Math.floor(Math.random()*images.length)]
      if(!arr.includes(randomImages)){
        arr.push(randomImages)
      }
    }
    console.log(arr);
    };

  useGSAP(()=>{
    const tl = gsap.timeline({repeat:-1,
      onComplete:updateImages,
      onRepeat:updateImages,
});
    tl.from(".box1",{
      x:-200,
      y:-200,
      opacity:0,
      rotateY:-360,
      stagger:0.1,

    })

    tl.to(".box1",{
      x:200,
      y:200,
      opacity:0,
      stagger:0.1,
      rotateY:-360,
    })
  
  })

  



  const handleMode = () => {
    const html = document.querySelector("html");
    const tl = gsap.timeline();
  
    if (mode === "light") {
     
      html.classList.add("light");
      html.classList.remove("dark");
  
      tl.to(darkRef.current, {
        x: -50, 
        opacity: 0,
        scale: 0.8, 
        rotate: -45, 
        duration: 0.5,
        ease: "power2.out",
      })
        .set(darkRef.current, { display: "none" })
        .set(lightRef.current, { display: "block" })
        .fromTo(
          lightRef.current,
          { x: 50, opacity: 0, scale: 1.2, rotate: 45 }, // Start larger and rotated
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)", 
          }
        );
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
  
      tl.to(lightRef.current, {
        x: 50, 
        opacity: 0,
        scale: 0.8, 
        rotate: 45, 
        duration: 0.5,
        ease: "power2.out",
      })
        .set(lightRef.current, { display: "none" })
        .set(darkRef.current, { display: "block" })
        .fromTo(
          darkRef.current,
          { x: -50, opacity: 0, scale: 1.2, rotate: -45 }, 
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)", // Add a bounce effect
          }
        );
    }
  };
  

  useEffect(handleMode, [mode]);

  const login = async() =>{
      window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/google`;
  }







  return (
    <div className="h-screen w-screen dark:bg-black bg-white  dark:bg-grid-white/[0.1]  bg-grid-black/[0.5] relative flex items-center justify-center overflow-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white "></div>
      <div className=" h-full w-full flex flex-col text-4xl justify-center items-center  sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">
        <div className="absolute h-full w-full flex justify-between ">
          <div className="h-full w-full   p-4">
            <div className="columns-3 sm:columns-4 md:columns-6 lg:columns-10 gap-4">
              {images.map((img, ind) => (
                <div
                  className="mb-4 box1 p-1 shadow-xl dark:shadow-[#ffffff] dark:shadow-md shadow-black  dark:bg-white bg-[#222] rounded-lg"
                  key={ind}

                >
                  <img
                    src={img}
                    alt="Placeholder"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute h-full w-full flex justify-between ">
          <div className="h-full w-1/4  bg-gradient-to-l from-transparent to-white dark:bg-gradient-to-l dark:from-transparent dark:to-black"></div>

          <div className="h-full w-1/4 bg-gradient-to-r from-transparent to-white dark:bg-gradient-to-r dark:from-transparent dark:to-black "></div>
        </div>
        <div className="h-full w-full  flex gap-4 absolute flex-col pb-40 ">
          <div className="w-full p-4 px-10  flex  text-black dark:text-white justify-between">
            <div className="flex text-[20px]">
              <p className="socialLogo">S</p>
              <p className="sociallogo">O</p>
              <p className="sociallogo">C</p>
              <p className="sociallogo">I</p>
              <p className="sociallogo">A</p>
              <p className="sociallogo">L</p>
            </div>
            <div
              className=" cursor-pointer rounded-xl relative  text-[12px] font-bold  flex justify-center items-center text-white "
              onClick={toggleMode}
            >
             <div
        ref={darkRef}
        className="absolute bg-white dark rounded-xl p-4 text-black"
        style={{ display: mode === "dark" ? "block" : "none" }}
      >
        D
      </div>
      <div
        ref={lightRef}
        className="absolute bg-black light rounded-xl p-4 text-white"
        style={{ display: mode === "light" ? "block" : "none" }}
      >
        L
      </div>
            </div>
          </div>
          <div className=" h-full w-full flex flex-col justify-center items-center ">
            <h1 className="text-white flex mb-8">
              <p className="social">S</p>
              <p className="social">O</p>
              <p className="social">C</p>
              <p className="social">I</p>
              <p className="social">A</p>
              <p className="social">L</p>
            </h1>
            <div className="h-12 w-12 google shadow-lg shadow-[#171717] rounded-full  bg-[#ffffff]  cursor-pointer px-4 flex justify-center items-center gap-4" onClick={login}>
              <img
                src="https://img.icons8.com/?size=48&id=17949&format=png"
                className="h-10 w-10 object-cover googleLogo"
                alt=""
              />
              <p className=" text-black text-sm font-semibold googleText">
                Sign in with <span className="text-red-600">Goo</span>
                <span className="text-yellow-600 stroke-black">g</span>
                <span className="text-green-600">l</span>
                <span className="text-blue-600">e</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
