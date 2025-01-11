import React, { useEffect, useState } from 'react'
import { createCategory,listCategory,removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';
import { Eraser } from 'lucide-react';


const FormCategory = () => {
    const token = useEcomStore((state)=>state.token)
    const [ name, setName ] = useState('')
    const [ categories, setCategories ] = useState([]) 

    useEffect(()=>{
        getCategory(token)
    },[])

    const getCategory = async(token)=>{
        try{
            const res = await listCategory(token)
            setCategories(res.data)
        }catch(err){
            console.log(err)
        }
    }

    const  haedleSubmit = async(e)=> {
        e.preventDefault()
        console.log(token,{name})
        if(!name){
            return toast.warning ( "Please Fill Data" ) 
        }
        try{
            const res = await createCategory(token,{name})
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} Success`)
            getCategory(token)
        }catch(err){
            console.log(err)
        }
    }

    const handleRemove = async(id)=> {
        console.log(id)
        try{
            const res  = await removeCategory(token,id)
            console.log(res)
            toast.success(`Deleted ${res.data.name} Success`)
            getCategory(token)

        }catch(err){    
            console.log(err)

        }
    }
    
    // console.log( 
    return (
    <div className=' rounded container mx-auto p-4 bg-white shadow-md'>
        <h1> Category Management </h1>
        <form  className='my-4' onSubmit={haedleSubmit}>
            <input 
                onChange={(e)=>setName(e.target.value)} 
                className='border rounded w-96' 
                type="text"
            />
            <button className='m-2 text-white bg-blue-500  rounded items-center p-1' >Add Category</button>
        </form>

    <hr />
        
        <ul className='list-none p-2' >
            {
                categories.map((item,index)=>
                    <li 
                
                className='flex justify-between my-2'
                key={index}>
                            <span>
                                {item.name}
                            </span>
                        
                        <button className='flex flex-row m-1 text-red-600 bg-red-200 rounded-md items-center p-1' onClick={()=>handleRemove(item.id)}>
                            {/* <Eraser className='m-1'/> */}
                            <Eraser size={20} strokeWidth={1.5} absoluteStrokeWidth className='m-1'/>
                            {/* <p>Delete</p> */}
                        </button>
                        {/* <hr /> */}
                    </li>
                )
            }
        </ul>
    </div>
  )
}

export default FormCategory