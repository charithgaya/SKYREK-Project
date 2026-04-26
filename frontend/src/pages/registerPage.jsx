import { useState } from "react";
import axios from "axios";

export default function RegisterPage(){
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           const res = await axios.post(
                import.meta.env.VITE_API_URL + "/api/users/register",
                formData
           );
           
           alert(res.data.message);
           setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",           
                phone: ""
            });

        } catch (error) {
            alert(error.res?.data?.message || "Error occurred while registering.");
        }
    }
    return(
        <div className="w-full h-screen bg-[url(./wallpaper.jpg)] bg-cover bg-center flex justify-center items-center opacity-90">
            <div className="w-[500px] h-[550px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[8px] text-pink-800 flex flex-col items-center justify-center">
                
                <h1 className="absolute top-[20px] text-2xl font-bold text-center my-1">Register</h1>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">First Name</span>   
                    <input name="firstName" type="text" onChange={handleChange} required className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>  
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Last Name</span>
                    <input name="lastName" type="text" onChange={handleChange} required className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Email</span>
                    <input name="email" type="email" onChange={handleChange} required className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Password</span>
                    <input name="password" type="password" onChange={handleChange} className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>
                </div>

                <div className="w-[350px] flex flex-col">
                    <span className="text-lg ">Phone</span>
                    <input name="phone" type="tel" onChange={handleChange} className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>
                </div>

                <button onClick={handleSubmit} className="w-[350px] h-[40px] font-semibold bg-pink-700 rounded-xl text-white text-lg mt-5 hover:scale-102 hover:bg-pink-600 transition-all duration-300">
                    Register
                </button>
            </div>
        </div>
    )
}