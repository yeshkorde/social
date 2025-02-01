import { useContext } from "react"
import { userContext } from "../context/userContext"


const useUserContext = ()=>{
    return useContext(userContext)
}

export default useUserContext;