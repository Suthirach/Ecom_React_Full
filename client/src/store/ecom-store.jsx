import axios from 'axios'
import { Await, Form } from 'react-router-dom'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import Product from '../pages/admin/Product'
import { listProduct, searchFilters } from '../api/product'


const ecomStore = (set) => ({
    user : null,
    token : null,
    categories : [], 
    Products : [],
    actionLognin : async(form)=> {
        const res = await axios.post('http://localhost:5000/api/login', form)
    //    console.log(res.data.token)
       set({
            user: res.data.payload,
            token: res.data.token
       }) 
       return res
        // console.log('ation Login')
    } ,
    
    getCategory : async()=>{
        try{
            const res = await listCategory()
            set({ categories : res.data })
        }catch(err){
            console.log(err)
        }
    },
    
    getProduct : async(count)=>{
        try{
            const res = await listProduct(count)
            set({ Products : res.data })
        }catch(err){
            console.log(err)
        }
    },

    actionSearchFilters : async(arg)=>{
        try{
            const res = await searchFilters(arg)
            set({ Products : res.data })
        }catch(err){
            console.log(err)
        }
    },
})

const userPersist = {
    name : 'ecom-store',
    Storage: createJSONStorage(()=>localStorage),

}

const useEcomStore = create(persist(ecomStore,userPersist))

export default useEcomStore 