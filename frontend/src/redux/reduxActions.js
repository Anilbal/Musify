import { singleUser } from "../api/userApi"
import {  ADD_TO_FAVOURITE, CLOSE_COMPONENT, OPEN_COMPONENT, REMOVE_FROM_FAVOURITE } from "./reduxConstants"

export const toogleOpen=()=>({
        type:OPEN_COMPONENT
})

export const toggleClose=()=>({
        type:CLOSE_COMPONENT
})

export const addToFavourite=(id)=>async(dispatch,getState)=>{
        let data=await singleUser(id)
        let payload={
                user:data._id,
                username:data.username,
                email:data.email,
                profile:data.profile,
                followBy:data.followBy,
                playlists:data.playLists
        }
        dispatch({type: ADD_TO_FAVOURITE,payload:payload})
    
        localStorage.setItem('favourite',JSON.stringify(getState().favourite))
    }

export const removeFromFavourite=(id)=>async(dispatch,getState)=>{
       await dispatch({type: REMOVE_FROM_FAVOURITE,payload:id})
        localStorage.setItem('favourite',JSON.stringify(getState().favourite))
}       