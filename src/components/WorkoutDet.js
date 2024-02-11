import { useAuthContext } from "../hooks/useAuthContext"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {URL} from '../App'

const WorkoutDet = ({workout}) => {
  
  const {dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  const handleClick = async() =>
  {
    if(!user){    
      return
    }
    
    const response  = await fetch(`${URL}/api/workout/${workout._id}`,{
      method : 'DELETE',
      headers : {
        'Authorization' : `Bearer ${user.token}`
      }
    })
    const json = await response.json()
   if(response.ok){
    dispatch({type : 'DELETE_WORKOUT' , payload : json})
   }
  }
  return (
    <div className='workout-details'>
    <h4> {workout.title}</h4>
    <p><strong> Load :  </strong> {workout.load}</p>
    <p><strong> Reps :  </strong> {workout.reps}</p>
    <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix : true})}</p>
    <span  className="material-symbols-outlined"  onClick={handleClick}>Delete</span>
    </div>
    
  )
}

export default WorkoutDet