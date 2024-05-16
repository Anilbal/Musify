import { API } from "../config"

export const register=(user)=>{
    return fetch(`${API}/register`,{
        method:"POST",
        body:user
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const login=(email,password)=>{
    return fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

export const authenticate=(userInfo)=>{
    localStorage.setItem('jwt',JSON.stringify(userInfo))
}

export const isAuthenticated=()=>{
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false
    }
}

export const topArtist=()=>{
    return fetch(`${API}/topartist`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// following user lists
export const followingUser=(id)=>{
    return fetch(`${API}/followinglists/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// get singe user by id
export const singleUser=(id)=>{
    return fetch(`${API}/singleuser/${id}`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}

// update user 
export const updateUser=(user,id)=>{
    return fetch(`${API}/updateuser/${id}`,{
        method:"PUT",
        body:user
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}
// logout user
export const logout=()=>{
    localStorage.removeItem("jwt")
    localStorage.removeItem('favourite')
    return fetch(`${API}/logout`,{
        method:"POST"
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}



// follow new user
export const followNewUser=(userId,token)=>{
    return fetch(`${API}/followuser/${userId}`,{
        method:"PUT",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    .then(response=>response.json())
    .catch(error=>console.log(error))
}