import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { URL } from "../App";

export const useSignup = () =>
{
    const[error,setError] = useState(null)
    const[isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email,password) =>{
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${URL}/api/user/signup`,{
            method : 'POST',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({email, password})
        })
        const json = await response.json()

        if(response.ok){
            setError(null)
            // Local storage
            localStorage.setItem('user',JSON.stringify(json))
            // update auth cont
            dispatch({type : 'LOGIN', payload: json})

            setIsLoading(false)    
        }
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
    }
    return {signup, isLoading, error}
}