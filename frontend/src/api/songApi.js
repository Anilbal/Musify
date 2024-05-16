import { API } from "../config"

// get all songs
export const allSongs=(token)=>{
    return fetch(`${API}/allsongs`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// all trending songs
export const getTrending=()=>{
    return fetch(`${API}/trending`)
    .then(response=>response.json())
    .catch(error=>console.log(error)) 
}

// get songs by user login
export const getSongsBYUser=(id)=>{
return fetch(`${API}/songbyartist/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error)) 
}


//get all liked songs by user token
export const getAllLikedSOngs=(token)=>{
    return fetch(`${API}/likedsongs`,{
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response=>response.json())
        .catch(error=>console.log(error)) 
}

// dislike songs or remove songs 

export const dislikeSongs=(id,token)=>{
    return fetch(`${API}/dislikesong/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response=>response.json())
        .catch(error=>console.log(error)) 
}

// single song by ids
export const getSongsById=(id)=>{
    return fetch(`${API}/singlesong/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error)) 
}


// relates song expect playlist songs
export const relatedSongs=(id)=>{
    return fetch(`${API}/getrelatedsongs/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error)) 
}

// like songs
export const likeSongs=(id,token)=>{
    return fetch(`${API}/likesong/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }
    })
        .then(response=>response.json())
        .catch(error=>console.log(error)) 
}

// add new song
export const addSong=(formData,token)=>{
    return fetch(`${API}/newsong`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`
        },
        body:formData
    })
        .then(response=>response.json())
        .catch(error=>console.log(error)) 
}