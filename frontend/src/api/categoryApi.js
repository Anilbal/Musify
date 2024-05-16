import { API } from "../config"

export const getAllGenre=()=>{
    return fetch(`${API}/getallgenre`)
    .then(response=>response.json())
    .catch(error=>console.log(error))
}