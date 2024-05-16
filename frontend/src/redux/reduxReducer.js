import Swal from "sweetalert2"
import {  ADD_TO_FAVOURITE, CLOSE_COMPONENT, OPEN_COMPONENT, REMOVE_FROM_FAVOURITE } from "./reduxConstants"

const initialState={
    isOpen:false,
    favourite:localStorage.getItem('favourite')?JSON.parse(localStorage.getItem('favourite')):[],
}


const reducerFunction=(state=initialState,action)=>{
    switch(action.type){
        case OPEN_COMPONENT:{
                return {
                    ...state,
                    isOpen:true
                  }
                }
        case CLOSE_COMPONENT:{
            return {
                ...state,
                isOpen:false
            }
        }

        case ADD_TO_FAVOURITE:{
            let new_favourite=action.payload
            let itemExits=state.favourite.find(item=>item.user===new_favourite.user)
            if(itemExits){
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    icon:"warning",
                    title: "Already added to  favourite",
                    position: "top-end",
                })
                return {...state}
            }else{
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    icon:"success",
                    title: " Added to your favourite successfully!!",
                    position: "top-end",
  
                })
                return {...state,favourite:[...state.favourite, new_favourite]}
            }
        }

        case REMOVE_FROM_FAVOURITE:{
                let favourite=action.payload
                Swal.fire("Alert"," Removed from your favourite!!","info")
                return {...state, favourite: state.favourite.filter(item=>item.user!==favourite)}
        }
        default:
            return state
        
    }
}

export default reducerFunction