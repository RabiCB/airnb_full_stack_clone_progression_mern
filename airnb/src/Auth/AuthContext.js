import axios from "axios";
import {useEffect,useState,useContext,createContext} from "react"

export const UserContext=createContext({})

export function User(){
    return useContext(UserContext)
}
export const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    useEffect(()=>{
        if(!user){
             axios.get("/profile").then(({data})=>{
                setUser(data)
             })
        }

    },[])
    return(
        <UserContext.Provider value={{user,setUser}}>
         {children}
        </UserContext.Provider>
        
    )

}