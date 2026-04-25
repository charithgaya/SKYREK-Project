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
        } catch (error) {
            alert(error.res?.data?.message || "Error occurred while registering.");
        }
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <form
                className="flex flex-col gap-4 w-[500px] h-[500px] border border-pink-500 p-2 rounded" 
                onSubmit={handleSubmit}
            >
                <h2 className="font-semibold text-2xl text-center p-6">Register page</h2>
                <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required className="border p-2 rounded" />
                <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required className="border p-2 rounded" />
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="border p-2 rounded" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />
                <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded" />
                <button className="bg-pink-500 hover:font-semibold hover:bg-pink-600 border-none p-2 rounded text-white cursor-pointer">
                    Register
                </button>
            </form>
        </div>
    )
}