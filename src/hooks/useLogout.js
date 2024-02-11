import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutsContext"

 export const useLogout = () =>
 {
    const {dispatch} = useAuthContext()
    const {dispatch : workoutDispatch} = useWorkoutContext()
    const logout = () =>{
        workoutDispatch({type : 'SET_WORKOUTS', payload : null})
        //remove user from local
        localStorage.removeItem('user')

        //dispatch logout 
        dispatch({type : 'LOGOUT'})
        
    }
    return {logout}
 }