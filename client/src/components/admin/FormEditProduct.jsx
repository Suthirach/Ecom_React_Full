import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { create } from "zustand";
import { createProduct, updateProduct, readProduct } from "../../api/product";
import { toast } from "react-toastify";
import { Pencil, Eraser, Edit } from "lucide-react";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";




const initialState = {
    title: "Acer Aspire Notebook",
    description: "Great notebook for personal use",
    price: 11500,
    quantity: 30,
    categoryId: "",
    images: [],
};

const FormEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = useEcomStore((state) => state.token);
    const getCategory = useEcomStore((state) => state.getCategory);
    const categories = useEcomStore((state) => state.categories);
    const getProduct = useEcomStore((state) => state.getProduct);
    const products = useEcomStore((state) => state.Products);
    


    const [form, setForm] = useState(initialState);
    useEffect(() => {

        getCategory();
        fechtProduct(token, id, form);
    }, []);

    const fechtProduct = async (token) => {
        try {
            const res = await readProduct(token, id, form);
            console.log(res);
            setForm(res.data);
        } catch (err) {
            console.log('error fetch data',err);
        }
    }


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
            const res = await updateProduct(token, id, form);
       
            toast.warning(`Edit Product Success`);
            navigate("/admin/product");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="flex-1 ml-0 md:ml-64 p-6">
                <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
                    <form onSubmit={handleSubmit}>
                        {/* Header */}
                        <h1 className="text-2xl font-bold mb-4 text-center">
                            Edit Product
                        </h1>

                        {/* Form Inputs */}
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                className="border p-3 rounded w-full text-sm"
                                value={form.title}
                                onChange={handleOnChange}
                                placeholder="Title"
                                name="title"
                            />
                            <input
                                className="border p-3 rounded w-full text-sm"
                                value={form.description}
                                onChange={handleOnChange}
                                placeholder="Description"
                                name="description"
                            />
                            <input
                                type="number"
                                className="border p-3 rounded w-full text-sm"
                                value={form.price}
                                onChange={handleOnChange}
                                placeholder="Price"
                                name="price"
                            />
                            <input
                                type="number"
                                className="border p-3 rounded w-full text-sm"
                                value={form.quantity}
                                onChange={handleOnChange}
                                placeholder="Quantity"
                                name="quantity"
                            />
                            <select
                                className="border p-3 rounded w-full text-sm"
                                name="categoryId"
                                onChange={handleOnChange}
                                required
                                value={form.categoryId}
                            >
                                <option value={id} disabled>
                                    Please Select
                                </option>
                                {categories.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <Uploadfile form={form} setForm={setForm} />

                            <button className="w-full bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 transition mt-4 text-sm">
                                Edit Product
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default FormEditProduct;

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
