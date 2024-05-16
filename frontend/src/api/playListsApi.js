import { API } from "../config"

export const getPlayListByMembers=(id)=>{
    return fetch(`${API}/playlistbymembers/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// related playlists
export const getRelatedPlayLists=(id)=>{
    return fetch(`${API}/relatedplaylist/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
// get single Playlists
export const getSinglePlaylist=(id)=>{
    return fetch(`${API}/singleplaylist/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get songs by Playlitss
export const songsByPlaylists=(id)=>{
    return fetch(`${API}/songsbyplaylist/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// creating new playlist
export const createPlaylist=(formData,token)=>{
    return fetch(`${API}/newplaylist`,{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`
        },
        body:formData
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// remove members from playlist
export const removeFromPlaylist=(token,id,userId)=>{
    return fetch(`${API}/removemember/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({userId})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// remove members from playlist
export const addToPlaylist=(token,id,userId)=>{
    return fetch(`${API}/addmembers/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({userId})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// delete playlists
export const deletePlayList=(id,token)=>{
    return fetch(`${API}/deleteplaylist/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// adding songs to playlist
export const addSongsToPlaylist=(songId,token,playlistId)=>{
    return fetch(`${API}/addsongtoplaylist/${playlistId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({songId})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// removing songs to playlist
export const removeSongsFromPlaylist=(songId,token,playlistId)=>{
    return fetch(`${API}/removesongfromplaylist/${playlistId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({songId})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}