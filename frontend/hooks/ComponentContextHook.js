import { useContext } from "react"
import { ComponentContext } from "../context/ComponentContext";


const useComponentContext = () =>{
    return useContext(ComponentContext)
}


export default useComponentContext;