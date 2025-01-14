import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFiles, uploadFiles } from "../../api/product";
import useEcomStore from "../../store/ecom-store";
import { all } from "axios";
import { X, LoaderCircle   } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
    const token = useEcomStore((state) => state.token);
    const [isloading, setIsloading] = useState(false);

    const handleRemoveImage = (public_id) => {
        // const updatedImages = form.images.filter((_, i) => i !== index);
        // setForm({ ...form, images: updatedImages });
        console.log(public_id);
        removeFiles(token, public_id)
            .then((res) => {
                console.log(res);
                const updatedImages = form.images.filter((item) => item.public_id !== public_id);
                setForm({
                    ...form,
                    images: updatedImages,
                });
                toast.success("Image Deleted Successfully");
            })
            .catch((err) => {
                console.log(err);
                toast.error("Delete Image Failed, Try Again");
            });  
      };

    const haedleOnChange = (e) => {
        setIsloading(true);
        const files = e.target.files;

        if (files) {
            setIsloading(true);
            let allFiles = form.images;

            for (let i = 0; i < files.length; i++) {
                // allFiles.push(files[i])
                // console.log(files[i])

                const file = files[i];
                if (!file.type.startsWith("image/")) {
                    toast.error(`${file.name} is not an image file`);
                    continue;
                }
                // image resizer react
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        // endpoint Backend
                        uploadFiles(token, data)
                            .then((res) => {
                                console.log(res);

                                allFiles.push(res.data);
                                setForm({
                                    ...form,
                                    images: allFiles,
                                });
                                setIsloading(false);
                                toast.success("uploaded Images Successfully");
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsloading(false);
                                toast.error("upload image failed, try again");
                            });
                    },
                    "base64"
                );
            }
        }
    };
    // console.log(form);
    return (
        <div>
            
            <div className="flex flex-wrap my-4 mx-auto">
                <div>
                    {   
                        isloading && <LoaderCircle className="items-center animate-spin" text="loading...is your image"/>
                    }
                </div>
                {/* <LoaderCircle className=" animate-spin"/> */}
            {
                form.images.map((item, index) => (
                <div className="w-1/4 p-2 relative" key={index}>
                    <img 
                    src={item.url} 
                    alt={`Image ${index}`} 
                    className="w-full h-auto rounded-lg hover:opacity-80 hover:scale-105 transition-opacity duration-200"    
                    />
                    <span 
                    className="absolute top-2 right-2 bg-red-500 text-white text-sm p-2 rounded-full cursor-pointer hover:bg-red-600 transition-colors duration-200"
                    onClick={() => handleRemoveImage(item.public_id)} // handleRemoveImage คือฟังก์ชันที่จะทำให้ลบภาพได้
                    ><X size={20} strokeWidth={1.5} />
                    
                    </span>
                </div>
                ))
            }
            </div>
            <div className="border border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center justify-center space-y-2 text-center text-sm text-gray-600">
                <input
                    onChange={haedleOnChange}
                    type="file"
                    name="images"
                    multiple
                    // {/* <p className="text-gray-500">Drag and drop files here, or click to select files</p> */}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>
        </div>
    );
};

export default Uploadfile;
