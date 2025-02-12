
import Slider from "./sliders/Slider"
function PostComponent ({post}) {
  
  return (
    <div>
        <Slider media={post.media}/>
     </div>
  )
}

export default PostComponent 