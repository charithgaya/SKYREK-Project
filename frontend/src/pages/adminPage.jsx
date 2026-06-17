import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { FaTachometerAlt } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import ProductsAdminPage from "./admin/productsAdminPage";
import DashboardAdminPage from "./admin/dashboardAdminPage";
import SettingsAdminPage from "./admin/settingsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminPage() {
	const navigate = useNavigate();
	const [adminValidated, setAdminValidated] = useState(false);
	const [adminUser, setAdminUser] = useState(null);
	useEffect(
        ()=>{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("You are not logged in");
                navigate("/login");
            }else{
                axios.get(import.meta.env.VITE_API_URL+"/api/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((response) => {
                    if (response.data.role == "admin") {
						setAdminUser(response.data);
                        setAdminValidated(true);
                    } else {
                        toast.error("You are not authorized");
                        navigate("/login");
                    }
                }).catch(() => {
                    toast.error("You are not authorized");
                    navigate("/login");
                });
            }
        }
    ,[navigate]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		toast.success("Logged out successfully");
		navigate("/login");
	};

	return (
		<div className="w-full h-screen flex">
			{adminValidated?<>
				<div className="w-[300px] h-full flex flex-col items-center">
					<span className="text-3xl text-pink-700 font-bold my-5">Admin Panel</span>

					<Link
						className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl text-pink-900 gap-[25px]"
						to="/admin"
					>
						<FaTachometerAlt className="text-pink-700" /> Dashboard
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl text-pink-900 gap-[25px]"
						to="/admin/products"
					>
						<FaBoxArchive className="text-pink-700" /> Products
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl text-pink-900 gap-[25px]"
						to="/admin/orders"
					>
						<GiShoppingBag className="text-pink-700" /> Orders
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl text-pink-900 gap-[25px]"
						to="/admin/users"
					>
						<IoPeople className="text-pink-700" /> Users
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full p-[20px] items-center text-xl text-pink-900 gap-[25px]"
						to="/admin/settings"
					>
						<IoSettings className="text-pink-700" /> Settings
					</Link>
					
					<div className="mt-auto w-full p-5 border-t border-pink-100 bg-pink-50/30 flex flex-col items-center gap-3">
                        {adminUser && (
                            <div className="flex items-center gap-3 w-full">
                                <img src={adminUser.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="Admin Profile" className="w-12 h-12 rounded-full object-cover border-2 border-pink-500" />
                                <div className="flex flex-col overflow-hidden">
                                    <span className="font-bold text-pink-900 truncate">{adminUser.firstName} {adminUser.lastName}</span>
                                    <span className="text-xs text-gray-500 truncate">{adminUser.email}</span>
                                </div>
                            </div>
                        )}
                        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-pink-100 text-pink-700 p-2 rounded-xl hover:bg-pink-200 transition-colors font-bold mt-2 cursor-pointer">
                            <MdLogout /> Logout
                        </button>
                    </div>
				</div>
				<div className="w-[calc(100%-300px)]  h-full">
					<Routes>
						<Route path="/" element={<DashboardAdminPage />} />
						<Route path="/products" element={<ProductsAdminPage />} />
						<Route path="/newProduct" element={<AddProductPage />} />
						<Route path="/orders" element={<OrdersPageAdmin />} />
						<Route path="/updateProduct" element={<UpdateProductPage />} />
						<Route path="/settings" element={<SettingsAdminPage setAdminUser={setAdminUser} />} />
					</Routes>
				</div>
			</>:<Loader/>}
		</div>
	);
}
