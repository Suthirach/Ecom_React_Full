import axios from 'axios'
import { Await, Form } from 'react-router-dom'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import Product from '../pages/admin/Product'
import { listProduct, searchFilters } from '../api/product'
import _ from 'lodash'
import { toast } from 'react-toastify'


const ecomStore = (set, get) => ({
    user : null,
    token : null,
    categories : [], 
    Products : [],
    carts: [], 
    
    logout:()=>{
        try{

            set({
                user : null,
                token : null,
                categories : [], 
                Products : [],
                carts: [], 
                
            })
            toast.success("Logout Success")
        }catch(err){
            console.log(err)
        }

    },

    actionAddCart:(product)=>{
        const  carts = get().carts
        const updateCart = [...carts,{...product,count:1 }]

        // step uniqe   
        const uniqe = _.unionWith(updateCart,_.isEqual)
        // console.log("Click add in Zundtand",carts)
        console.log("carts",carts)

        set({carts: uniqe})
    },

    actionUpdateQuantity:(productId,newQuantity)=>{
        // console.log("Update Click",productId,newQuantity)
        set((state)=>({
            carts: state.carts.map((item)=>
                item.id === productId
                    ? { ...item , count: Math.max(1,newQuantity) } 
                    : item

            )
        }))
    },

    actionRemoveProduct:(productId)=>{
        // console.log("Remove Yellllll",productId)
        set((state)=>({
            carts: state.carts.filter((item)=>
                item.id !== productId
            )
        }))
    },

    getetTotolPrice:()=>{
        return get().carts.reduce((total,item)=>{
            return total + item.price * item.count 
        },0)
    },

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

    clearCart: ()=> {
         set({ carts: []})
    },

    ProtectrAdmin : async()=>{
        try{
            
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