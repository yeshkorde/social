import {useRef} from 'react'
import gsap from 'gsap';
function SaveComponent() {

  const circleRef = useRef();

  const handleMouseOver = (e) =>{

    gsap.to(e.target,{
      boxShadow:"2px 2px 40px #fff200",
       duration:0.2,
       })
   
    gsap.to(circleRef.current,{
      stroke:"#fff200"
    })
    }
    
    const handleMouseLeave = (e)=>{
 
      gsap.to(circleRef.current,{
        stroke:"#697986"
      })
      gsap.to(e.target,{
        boxShadow:"none",
         duration:0.2,
         })
    }


  return (
    <div
    className="flex justify-center items-center p-2 rounded-full  cursor-pointer"
    onMouseEnter={(e)=>handleMouseOver(e)}
    onMouseLeave={(e)=>handleMouseLeave(e)} 
  >
    <svg
    aria-label="Save"
    height="20"
    role="img"
    viewBox="0 0 24 24"
    width="20"
  >
    <title>Save</title>
    <polygon
      fill="none"
      points="20 21 12 13.44 4 21 4 3 20 3 20 21"
      className='dark:stroke-[#697986] stroke-[#4c555d]'
      strokeLinecap="round"
      ref={circleRef}
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
  </div>
  )
}

export default SaveComponent