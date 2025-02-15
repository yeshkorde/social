import {useRef} from 'react'
import gsap from 'gsap'

function ShareComponent() {

  const circleRef = useRef();
  const arrowRef = useRef()


  const handleMouseOver = (e) =>{
   
    


    gsap.to(circleRef.current,{
      stroke:"#00ffa9"
    })
    gsap.to(arrowRef.current,{
      stroke:"#00ffa9"
    })
    }
    
    const handleMouseLeave = (e)=>{
   
      gsap.to(circleRef.current,{
        stroke:"#697986"
      })
      gsap.to(arrowRef.current,{
        stroke:"#697986"
      })
    }
    





  return (
    <div
    className="flex justify-center items-center p-2 rounded-full groupe cursor-pointer bg-transparent "
    onMouseEnter={(e)=>handleMouseOver(e)}
    onMouseLeave={(e)=>handleMouseLeave(e)} 
  >
    <svg
    aria-label="Share"
    className="dark:fill-[#697986] fill-[#4c555d]"
    height="20"
    role="img"
    viewBox="0 0 24 24"
    width="20"
  >
    <title>Share</title>
    <line
 ref={circleRef}
    className='dark:stroke-[#697986] stroke-[#4c555d] group-hover:stroke-black'
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.083"
    ></line>
    <polygon
      fill="none"
      ref={arrowRef}
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
     className='dark:stroke-[#697986] stroke-[#4c555d] shadow-md shadow-black'
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
  </div>
  )
}

export default ShareComponent