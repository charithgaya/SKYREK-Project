import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const googleLogin = useGoogleLogin({
        onSuccess: (response)=>{
            axios.post(import.meta.env.VITE_API_URL+"/api/users/google-login",{
                token : response.access_token
            }).then(
                (response)=>{
                    console.log(response.data)
                    localStorage.setItem("token",response.data.token)
                    toast.success("Login successful")
                    if(response.data.role == "admin"){
                        navigate("/admin")
                    }else if(response.data.role == "user"){
                        navigate("/")
                    }
                }
            ).catch(
                ()=>{
                    toast.error("google login failed")
                }
            )
        }
    })

    function login(){
        console.log(email, password)
        axios.post(import.meta.env.VITE_API_URL+"/api/users/login",{
            email: email,
            password: password
        }).then(
            (response)=>{
                console.log(response.data)
                localStorage.setItem("token",response.data.token)

                // const token = localStorage.getItem("token")
                toast.success("login successful")
                if(response.data.role == "admin"){

                    //window.location.href = "/admin"
                    navigate("/admin")

                }else if(response.data.role == "user"){

                    //window.location.href = "/"
                    navigate("/")

                }
            }
        ).catch(
            (error)=>{
                console.log(error)
                toast.error("Login Failed")
            }
        )
    }

	return (
		<div className="w-full h-screen bg-[url(./wp2.jpg)] bg-cover bg-center flex justify-center items-center opacity-90">
			<div className="w-[500px] h-[500px] backdrop-blur-sm shadow-2xl rounded-[30px] relative gap-[20px] text-pink-900 flex flex-col items-center justify-center">
				<h1 className="absolute top-[20px] text-2xl font-bold text-center my-2">Login</h1>
                <div className="w-[350px]  flex flex-col">
                    <span className="text-lg ">Email</span>
                    <input 
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                    type="text" className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>
                </div>
                <div className="w-[350px]  flex flex-col    ">
                    <span className="text-lg ">Password</span>

                    <input onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } type="password" className="w-[350px] h-[40px] border border-pink-700 rounded-xl"/>

                </div>
                <button onClick={login} className="w-[350px] h-[40px] font-semibold bg-pink-700 rounded-xl text-white text-lg mt-5 hover:scale-102 hover:bg-pink-600 transition-all duration-300">
                    Login
                </button>
                <button onClick={googleLogin} className="w-[350px] h-[40px] font-semibold bg-pink-700 rounded-xl text-white text-lg mt-2 hover:scale-102 hover:bg-pink-600 transition-all duration-300">
                    <FaGoogle className="inline mr-2 text-lg p-0.6" />
                    Login via Google
                </button>
                <p>Don't have an account? <Link to="/register" className="text-pink-500 hover:text-pink-600">Sign up</Link> from here</p>
                <p>Forget Password? <Link to="/forget" className="text-pink-500 hover:text-pink-600">reset password</Link> from here</p>
                
			</div>
		</div>
	);
}
