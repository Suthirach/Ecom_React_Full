import axios from "axios";

export const createCategory = async (token,form)=> {
    return  await axios.post('http://localhost:5000/api/category',form,{
       headers:{
            Authorization: `Berare ${token}`
       } 
    })
}

export const listCategory = async (token)=> {
    return  await axios.get('http://localhost:5000/api/category',{
       headers:{
            Authorization: `Berare ${token}`
       } 
    })
}

export const removeCategory = async (token,id)=> {
    return  await axios.delete('http://localhost:5000/api/category/'+id,{
       headers:{
            Authorization: `Berare ${token}`
       } 
    })
}