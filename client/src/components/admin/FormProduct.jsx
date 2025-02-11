import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { create } from "zustand";
import { createProduct, deleteProduct, listProduct } from "../../api/product";
import { toast } from "react-toastify";
import { Pencil, Eraser } from "lucide-react";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { dateformat } from "../../utils/dateformat";


const initialState = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
    images: [],
};

const FormProduct = () => {
    const token = useEcomStore((state) => state.token);
    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);
    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.Products);
    // console.log(products);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: "",
        images: [],
    })

    useEffect(() => {
        getCategory(token);
        getProduct(100);
    }, []);

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createProduct(token, form);
            console.log(res);
            setForm(initialState);
            getProduct()
            toast.success(`Add : ${res.data.title} Success!`);
        } catch (err) {
            console.log(err);
        }
    };
    const handleDelete = async (id) => {
        console.log(id); 
        if(window.confirm("Are you sure to delete this product?")){
            try{
                const res = await deleteProduct(token,id)
                console.log(res)
                getProduct()  
                toast.success(`Delete Success!`)
            }catch(err){
                console.log(err)
            }   
        }

    }

    return (
        <div className="flex md:flex-row min-h-screen bg-gray-900 text-white">
          {/* Main Content */}
          <main className="flex-1 ml-0 md:ml-64 p-6">
            {/* Add Product Form */}
            <div className=" mx-auto p-6 bg-gray-800 shadow-lg rounded-lg max-w-xl">
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <h1 className="text-3xl font-bold mb-6 text-center text-white">
                  Add Product
                </h1>
      
                {/* Form Inputs */}
                <div className="grid grid-cols-1 gap-6">
                  <input
                    className="border p-3 rounded-lg w-full text-gray-700 bg-gray-900 focus:ring focus:ring-blue-500"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="Title"
                    name="title"
                  />
                  <input
                    className="border p-3 rounded-lg w-full text-gray-700 bg-gray-900 focus:ring focus:ring-blue-500"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="Description"
                    name="description"
                  />
                  <input
                    type="number"
                    className="border p-3 rounded-lg w-full text-gray-700 bg-gray-900 focus:ring focus:ring-blue-500"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="Price"
                    name="price"
                  />
                  <input
                    type="number"
                    className="border p-3 rounded-lg w-full text-gray-700 bg-gray-900 focus:ring focus:ring-blue-500"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="Quantity"
                    name="quantity"
                  />
                  <select
                    className="border p-3 rounded-lg w-full text-gray-700 bg-gray-900 focus:ring focus:ring-blue-500"
                    name="categoryId"
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    {categories.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <Uploadfile form={form} setForm={setForm} />
      
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 mt-4 text-lg shadow-md">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
      
            {/* Products Table */}
            <div className="container mx-auto p-6 bg-gray-800 shadow-lg rounded-lg mt-6">
              <h1 className="text-3xl font-bold mb-6 text-center text-white">
                Products
              </h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 text-sm shadow-md">
                  <thead>
                    <tr className="bg-blue-900">
                      {[
                        "No",
                        "Image",
                        "Name",
                        "Description",
                        "Price",
                        "Quantity",
                        "Sold",
                        "Updated",
                        "Manage",
                      ].map((header) => (
                        <th
                          key={header}
                          className="border border-gray-700 px-4 py-2 text-left text-gray-300"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-blue-800 ${
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                        }`}
                      >
                        <td className="px-4 py-2 text-center text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {item.images.length > 0 ? (
                            <img
                              src={item.images[0].url}
                              alt={item.title}
                              className="w-16 h-16 object-cover shadow"
                            />
                          ) : (
                            <span className="text-gray-500 italic">No Image</span>
                          )}
                        </td>
                        <td className="px-4 py-2">{item.title}</td>
                        <td className="px-4 py-2">{item.description}</td>
                        <td className="px-4 py-2 text-right">${numberFormat(item.price.toFixed(2))}</td>
                        <td className="px-4 py-2 text-right">{item.quantity}</td>
                        <td className="px-4 py-2 text-right">{item.sold}</td>
                        <td className="px-4 py-2">{dateformat(item.updateAt)}</td>
                        <td className="gap-2 flex items-center justify-center px-4 py-2">
                          <Link 
                           
                            to={`/admin/product/${item.id}`}>
                            <button className=" gap-2 flex items-center justify-center text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg px-3 py-2 text-sm transition-all duration-200">
                              <Pencil size={18} strokeWidth={1.5} />
                            </button>
                          </Link>
      
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="flex items-center justify-center text-white bg-red-500 hover:bg-red-400 rounded-lg px-3 py-2 text-sm transition-all duration-200"
                          >
                            <Eraser size={18} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      );
      
};

export default FormProduct;

//   return (
//     <div className=" rounded container mx-auto p-4 bg-white shadow-md">
//       <form onSubmit={handleSubmit}>
//         <h1>เพิ่มข้อมูลสินค้า</h1>
//         <input
//           className="border"
//           value={form.title}
//           onChange={handleOnChange}
//           placeholder="Title"
//           name="title"
//         />
//         <input
//           className="border"
//           value={form.description}
//           onChange={handleOnChange}
//           placeholder="Description"
//           name="description"
//         />
//         <input
//           type="number"
//           className="border"
//           value={form.price}
//           onChange={handleOnChange}
//           placeholder="Price"
//           name="price"
//         />
//         <input
//           type="number"
//           className="border"
//           value={form.quantity}
//           onChange={handleOnChange}
//           placeholder="Quantity"
//           name="quantity"
//         />
//         <select
//           className="border"
//           name="categoryId"
//           onChange={handleOnChange}
//           required
//           value={form.categoryId}
//         >
//           <option value="" disabled>
//             Please Select
//           </option>
//           {categories.map((item, index) => (
//             <option key={index} value={item.name}>
//               {item.name}
//             </option>
//           ))}
//         </select>
//         <hr />
//         <button className="bg-blue-500">Add Product</button>
//         <hr />
//         <table class="table">
//           <thead>
//             <tr>
//               <th scope="col">No</th>
//               <th scope="col">Name</th>
//               <th scope="col">Description</th>
//               <th scope="col">Price</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Sold</th>
//               <th scope="col">Updated</th>
//               <th scope="col">Manage</th>
//             </tr>
//           </thead>
//           <tbody>
//             {
//                 products.map((item,index)=>{
//                     console.log(item)
//                     return(
//                         <tr>
//                         <th scope="row">{index+1}</th>
//                         <td>{item.title}</td>
//                         <td>{item.description}</td>
//                         <td>{item.price}</td>
//                         <td>{item.quantity}</td>
//                         <td>{item.sold}</td>
//                         <td>{item.updateAt}</td>
//                         <td>
//                             <p>Edit</p>
//                             <p>Delete</p>
//                         </td>
//                         </tr>
//                     )
//                 },[])
//             }

//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
