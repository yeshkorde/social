import { useContext } from "react"
import { ModeContext } from "../context/ModeContext"

const useModecontext = () =>{
    return useContext(ModeContext)
}


export default useModecontext;