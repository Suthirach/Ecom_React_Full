import React, {useEffect,useState} from "react";
import useEcomStore from "../../store/ecom-store";
import { listUserCart,saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { Link,useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCart = () => {
    const token = useEcomStore((state)=>state.token);
    const [ products,setProducts ] = useState([]);
    const [ cartTotal, setCartTotal ] = useState(0); 

    const [ address ,setAddress ] = useState('');
    const [ addressSaved ,setAddressSaved ] = useState(false)

    const navigate = useNavigate();


    useEffect(()=>{
        hdlGetUserCart(token)
    },[])

    const hdlGetUserCart = (token) => {
        listUserCart(token)
        .then((res)=>{
            // console.log(res)
            setProducts(res.data.products)
            setCartTotal(res.data.cartTotal)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const hdlSaveAddress = ()=>{
        // console.log('address',address)
        if(!address){
            return toast.warning("Please fill address!!")
        }
        saveAddress(token,address)
        .then((res)=>{
            console.log(res)
            toast.success(res.data.massage)
            setAddressSaved(true)
        })
        .catch((err)=>{
            console.log(err)
            toast.err("save address fail")
        })

    }

    const hdlGoPayment =()=>{
        
        if(!addressSaved){
            return toast.warning("Please fill address!!")

        }
        navigate('/user/payment');
    }
    
 


    return (
        <div className="container mx-auto p-2">
            <div className="flex flex-wrap gap-4 ">
                {/*LEFT  */}
                <div className="w-2/4">
                    <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
                        <h1 className=" font-bold text-xl">
                            Shipping address
                        </h1>
                        <textarea 
                            required
                            onChange={(e)=>setAddress(e.target.value)}
                            placeholder="Please enter your address."    
                            className="w-full px-2 rounded-md">
                            
                        </textarea>
                        <button 
                            onClick={hdlSaveAddress}
                            className=" bg-yellow-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 hover:scale-105 hover:translate-y-1 hover:duration-200  ">
                            save
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-2/5">
                    <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
                        <h1 className=" font-bold text-xl">Summary</h1>

                        {/* item list */}


                        {
                            products?.map((item,index)=>
                            
                            <div key={index}>
                                <div className=" flex justify-between item-end">
                                    <div className=" ">
                                        <p className="font-bold">{item.product.title}</p>
                                        <p >quantity : {item.count} x {numberFormat(item.product.price)}</p>
                                    </div>

                                    <div>
                                        <p className="text-red-500 font-bold">
                                            {numberFormat(item.count * item.product.price)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            )
                        }

      






                        <hr />
                        <div>
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-bold">carriage : </p>
                                    <p>0.00</p>
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-bold">discount : </p>
                                    <p>0.00</p>
                                </div>
                            </div>
                        </div>
                            <hr />
                        <div>
                            <div>
                                <div className=" text-xl font-bold flex justify-between">
                                    <p>net Total : </p>
                                    <p className="text-orange-500">{numberFormat(cartTotal)}</p>
                                </div>
                            </div>
                        </div>
                            <hr />
                        <div className="">
                                <button 
                                    onClick={hdlGoPayment}
                                    // disabled = {  }
                                    className="text-white p-4 bg-orange-400 rounded-md w-full hover:bg-orange-600 hover:scale-105 disabled:bg-slate-700  disabled:scale-100   hover:duration-200"  >
                                    Payment
                                </button>
                            
                            
                        </div>    

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SummaryCart;
