import {useRef} from 'react'
import gsap from 'gsap';
function CommentComponent() {
  const circleRef = useRef();

  const handleMouseOver = (e) =>{
  
    gsap.to(circleRef.current,{
      stroke:"#009dff"
    })
    }
    
    const handleMouseLeave = (e)=>{
     
      gsap.to(circleRef.current,{
        stroke:"#697986"
      })
      
    }
    


  return (
    <div
    className="flex justify-center items-center p-2 rounded-full  cursor-pointer"
    onMouseEnter={(e)=>handleMouseOver(e)}
    onMouseLeave={(e)=>handleMouseLeave(e)} 
  >
    <svg
    aria-label="Comment"
   className="dark:fill-[#697986] fill-[#4c555d]"
    height="20"

    role="img"
    viewBox="0 0 24 24"
    width="20"
  >
    <title>Comment</title>
    <path
      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
      fill="none"
       className='dark:stroke-[#697986] stroke-[#4c555d]'
       ref={circleRef}
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
  </div>
  )
}

export default CommentComponent