import gsap from "gsap"


const animate = () =>{
const tl = gsap.timeline();

tl.from(".mainsideBar",{
  y:1000,
  opacity:0,
  duration:0.3
})
tl.from(".item",{
  x:-200,
  opacity:0,
  stagger:-0.2,
  ease:"back.out"
})
}

export default animate