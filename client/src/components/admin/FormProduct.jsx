import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { create } from "zustand";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import { Pencil, Eraser } from "lucide-react";

const initialState = {
  title: "Acer Aspire Notebook",
  description: "Great notebook for personal use",
  price: 11500,
  quantity: 30,
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.Products);
  console.log(products);

  const [form, setForm] = useState(initialState);
  useEffect(() => {
    getCategory(token);
    getProduct(token, 20);
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
      toast.success(`Add : ${res.data.title} Success!`);
    } catch (err) {
      console.log(err);
    }
  };

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
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 ml-0 md:ml-64 p-6">
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-xl">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>

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
                <option value="" disabled>
                  Please Select
                </option>
                {categories.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>

              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition mt-4 text-sm">
                Add Product
              </button>
            </div>
          </form>
        </div>

        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Products</h1>
          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    No
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Name
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Quantity
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Sold
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Updated
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    Manage
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="border border-gray-200 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.title}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.description}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-right">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-right">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-right">
                      {item.sold}
                    </td>
                    <td className="border border-gray-200 px-4 py-2">
                      {item.updateAt}
                    </td>
                    <td className="flex flex-row  border border-gray-200 px-4 py-2 text-center">
                      <button className="flex items-center gap-2 text-yellow-700 bg-yellow-200 hover:bg-yellow-400 rounded-lg px-3 py-2 text-sm transition-all hover:underline mr-2">
                        <Pencil size={18} strokeWidth={1.5} />
                      </button>
                      <button className="flex items-center gap-2 text-red-600 bg-red-200 hover:bg-red-400 rounded-lg px-3 py-2 text-sm transition-all hover:underline mr-2">
                        <Eraser size={18} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            ``
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormProduct;
