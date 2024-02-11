import { useEffect } from "react"
import WorkoutDet from "../components/WorkoutDet"
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"


const Home = () => {

  const {workouts , dispatch} = useWorkoutContext()
  const {user} = useAuthContext()

  useEffect( () => 
  {
    const fetchworkout = async () =>
    {
      const response = await fetch('/api/workout',{
        headers :{
           'Authorization' : `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){ 
        dispatch({type: 'SET_WORKOUTS',payload : json})
      }
    }
    if(user){
    fetchworkout()
    }
  }, [dispatch,user] )

  return (
    <div className="home">
      <div className="workouts">
        { workouts && workouts.map((workout) =>
        (
          <WorkoutDet key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home