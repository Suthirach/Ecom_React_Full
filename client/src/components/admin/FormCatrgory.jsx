import React, { useEffect, useState } from 'react'
import { createCategory,listCategory,removeCategory } from '../../api/Category'
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';
import { Eraser } from 'lucide-react';


const FormCategory = () => {
    const token = useEcomStore((state)=>state.token)
    const [ name, setName ] = useState('')
    // const [ categories, setCategories ] = useState([]) 
    const categories = useEcomStore((state)=>state.categories)
    const getCategory = useEcomStore((state)=>state.getCategory)

    useEffect(()=>{
        getCategory(token)
    },[])

    // const getCategory = async(token)=>{
    //     try{
    //         const res = await listCategory(token)
    //         setCategories(res.data)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

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
//     return (
//     <div className=' rounded container mx-auto p-4 bg-white shadow-md'>
//         <h1> Category Management </h1>
//         <form  className='my-4' onSubmit={haedleSubmit}>
//             <input 
//                 onChange={(e)=>setName(e.target.value)} 
//                 className='border rounded w-96' 
//                 type="text"
//             />
//             <button className='m-2 text-white bg-blue-500  rounded items-center p-1' >Add Category</button>
//         </form>

//     <hr />
        
//         <ul className='list-none p-2' >
//             {
//                 categories.map((item,index)=>
//                     <li 
                
//                 className='flex justify-between my-2'
//                 key={index}>
//                             <span>
//                                 {item.name}
//                             </span>
                        
//                         <button className='flex flex-row m-1 text-red-600 bg-red-200 rounded-md items-center p-1' onClick={()=>handleRemove(item.id)}>
//                             {/* <Eraser className='m-1'/> */}
//                             <Eraser size={20} strokeWidth={1.5} absoluteStrokeWidth className='m-1'/>
//                             {/* <p>Delete</p> */}
//                         </button>
//                         {/* <hr /> */}
//                     </li>
//                 )
//             }
//         </ul>
//     </div>
//   )

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
          
      
          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-64 p-6">
            <div className="container mx-auto p-6 bg-white shadow-xl rounded-lg max-w-3xl">
              {/* Header */}
              <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Category Management
              </h1>
      
              {/* Form */}
              <form
                className="flex flex-col md:flex-row items-center gap-4 mb-6"
                onSubmit={haedleSubmit}
              >
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  type="text"
                  placeholder="Add category name"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg px-4 py-2 transition-all duration-200">
                  Add Category
                </button>
              </form>
      
              <hr className="mb-6" />
      
              {/* Category List */}
              <ul className="space-y-4">
                {categories.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                  >
                    {/* Category Name */}
                    <span className="text-lg text-gray-700">{item.name}</span>
      
                    {/* Delete Button */}
                    <button
                      className="flex items-center gap-2 text-red-600 bg-red-200 hover:bg-red-300 rounded-lg px-3 py-2 text-sm transition-all"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Eraser size={18} strokeWidth={1.5} />
                      <span>Delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </main>
        </div>
      );
      
  
}

export default FormCategory