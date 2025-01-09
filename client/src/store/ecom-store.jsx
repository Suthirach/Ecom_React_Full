import axios from 'axios'
import { Await, Form } from 'react-router-dom'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const ecomStore = (set) => ({
    user : null,
    token : null,
    actionLognin : async(form)=> {
        const res = await axios.post('http://localhost:5000/api/login', form)
    //    console.log(res.data.token)
       set({
            user: res.data.payload,
            token: res.data.token
       }) 
       return res
        // console.log('ation Login')
    } 
})

const userPersist = {
    name : 'ecom-store',
    Storage: createJSONStorage(()=>localStorage),

}

const useEcomStore = create(persist(ecomStore,userPersist))

export default useEcomStore 