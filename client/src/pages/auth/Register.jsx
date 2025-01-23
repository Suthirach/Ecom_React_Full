import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import zxcvbn from "zxcvbn";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Key } from "lucide-react";
import { span } from "motion/react-m";

const registerSchema = z
    .object({
        email: z.string().email({ message: " Invalid email!!" }),
        password: z
            .string()
            .min(8, { message: " Password must be more than 8 digits.!!" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password is not match!!",
        path: ["confirmPassword"],
    });

const Register = () => {
    const [passwordScore, setPasswordScore] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const vaildatePassword = () => {
        let password = watch().password;
        return zxcvbn(password ? password : " ").score;
    };

    useEffect(() => {
        setPasswordScore(vaildatePassword());
    }, [watch().password]);

    console.log(passwordScore);

    const handleOnChange = (e) => {
        //code
        // console.log(e.target.name , e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    //Password is not Macth!!

    const onSubmit = async (data) => {
        const passwordScore = zxcvbn(data.password).score;
        // if (passwordScore < 3) {
        //     toast.warning("Password is not Strong!!");
        //     return
        // }
        try {
            // code ยังไม่แน่ใจ กลับมาดู มันErr แต่ไม่ Res. ที่ส่งกลับมาจากหลัวบ้าน (เปิดเซอร์แล้วมีRes.กลับมา)
            const res = await axios.post(
                "http://localhost:5000/api/register",
                data
            );
            toast.success(res.data);
            console.log(res);
        } catch (err) {
            const errMsg = err.response?.data?.message;
            toast.error(errMsg);
            console.log(errMsg);
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pb-40">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
                {/* Header */}
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
                    Register
                </h1>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            // id="email"
                            className="border  border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            // onChange={handleOnChange}
                            // name="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className=" mt-3 text-red-500 font-bold">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label
                            className="  border-gray-300 text-gray-700 font-medium mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register("password")}
                            // id="password"
                            className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            // onChange={handleOnChange}
                            // name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className=" mt-3 text-red-500 font-bold">
                                {errors.password.message}
                            </p>
                        )}

                        {watch().password?.length > 0 && (
                            <div className="justify-start flex  " >
                                {Array.from(Array(5).keys()).map(
                                    (item, index) => (
                                        <span
                                            key={index}
                                            className="w-1/5  px-1"
                                        >
                                            <div
                                                className={` rounded-2xl h-1.5  mt-2 ${
                                                    passwordScore <= 2
                                                        ? "bg-red-300"
                                                        : passwordScore < 4
                                                        ? " bg-yellow-300"
                                                        : " bg-green-300"
                                                }  
                                    `}
                                            ></div>
                                        </span>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col">
                        <label
                            className="text-gray-700 font-medium mb-2"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword")}
                            // id="confirmPassword"
                            className="border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            // onChange={handleOnChange}
                            // name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && (
                            <p className=" mt-3 text-red-500 font-bold">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        className="w-full bg-yellow-400 text-white font-bold py-3 text-lg rounded-lg hover:bg-orange-400 transition-all duration-200"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                {/* Additional Links */}
                <div className="text-center mt-8 text-gray-600">
                    <p>
                        Already have an account?{" "}
                        <a
                            href="login"
                            className="text-blue-500 hover:underline"
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );

    // return (
    //   <div>
    //     Register
    //     <form onSubmit={handleSubmit}>

    //       Email
    //       <input
    //       className="border"
    //       onChange={handleOnChange}
    //       name="email"
    //       type="email"
    //       />

    //       Password
    //       <input
    //       className="border"
    //       onChange={handleOnChange}
    //       name="password"
    //       type="text"
    //       />

    //       Confirm Password
    //       <input
    //       className="border"
    //       onChange={handleOnChange}
    //       name="confirmPassword"
    //       type="text"
    //       />

    //       <button className="bg-blue-500  rounded-sm">Register</button>

    //     </form>
    //   </div>
    // );
};

export default Register;
