import React, { useEffect, useState } from "react";
import {
    createCategory,
    listCategory,
    removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { Eraser } from "lucide-react";

const FormCategory = () => {
    const token = useEcomStore((state) => state.token);
    const [name, setName] = useState("");
    // const [ categories, setCategories ] = useState([])
    const categories = useEcomStore((state) => state.categories);
    const getCategory = useEcomStore((state) => state.getCategory);

    useEffect(() => {
        getCategory(token);
    }, []);

    // const getCategory = async(token)=>{
    //     try{
    //         const res = await listCategory(token)
    //         setCategories(res.data)
    //     }catch(err){
    //         console.log(err)
    //     }
    // }

    const haedleSubmit = async (e) => {
        e.preventDefault();
        console.log(token, { name });
        if (!name) {
            return toast.warning("Please Fill Data");
        }
        try {
            const res = await createCategory(token, { name });
            console.log(res.data.name);
            toast.success(`Add Category ${res.data.name} Success`);
            getCategory(token);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async (id) => {
        console.log(id);
        try {
            const res = await removeCategory(token, id);
            console.log(res);
            toast.success(`Deleted ${res.data.name} Success`);
            getCategory(token);
        } catch (err) {
            console.log(err);
        }
    };

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="w-full max-w-3xl p-8 bg-gray-800 shadow-2xl rounded-3xl">
          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-8 tracking-wide text-white">
            Category Management
          </h1>
    
          {/* Form */}
          <form
            className="flex flex-col md:flex-row items-center gap-4 mb-8"
            onSubmit={haedleSubmit}
          >
            <input
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-full p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              type="text"
              placeholder=" Enter new category"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full px-6 py-3 transition-all duration-200">
              Add Category
            </button>
          </form>
    
          <hr className="border-gray-600 mb-8" />
    
          {/* Category List */}
          <ul className="space-y-4">
            {categories.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 border border-gray-600 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <span className="text-lg font-medium">{item.name}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex text-sm items-center gap-2 text-white bg-red-700 hover:bg-red-500 rounded-full px-3 py-1 transition-all"
                >
                  <Eraser size={18} strokeWidth={1.5} />
                  <span className="font-thin">Delete</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
    
};

export default FormCategory;
