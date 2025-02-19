import {useRef} from 'react'
import gsap from 'gsap';
import PropTypes from "prop-types";

function CommentComponent({comments}) {
  const circleRef = useRef();
  
  const handleMouseOver = () =>{
  
    gsap.to(circleRef.current,{
      stroke:"#009dff"
    })
    }
    
    const handleMouseLeave = ()=>{
     
      gsap.to(circleRef.current,{
        stroke:"#697986"
      })
      
    }
    

  return (
    <div
    className="flex justify-center items-center p-2 rounded-full gap-2 group  cursor-pointer"
    onMouseEnter={handleMouseOver}
    onMouseLeave={handleMouseLeave} 
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
  <p className="text-[#697986] group-hover:text-[#009dff] ibm-plex-sans-medium">
        {comments.length}
      </p>
  </div>
  )
}

CommentComponent.propTypes = {
  comments:PropTypes.arrayOf(PropTypes.string)
}

export default CommentComponent