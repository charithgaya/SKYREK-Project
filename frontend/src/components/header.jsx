import { useState } from "react";
import { BiSolidCart, BiLogoProductHunt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdContactPhone, MdAccountCircle, MdReviews} from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { HiHome } from "react-icons/hi";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const token = localStorage.getItem("token");
	return (
		<header className="h-[96px] bg-pink-600 flex justify-center items-center relative">
			{isOpen && (
				<div className="fixed z-[100] top-0 right-0 w-[100vw] h-[100vh] bg-[#00000050]">
					<div className="h-full w-[350px] bg-white flex flex-col">
						<div className="w-full bg-pink-600 h-[100px] flex pl-[45px] flex-row items-center gap-[20px]">
							<GiHamburgerMenu className="text-white text-3xl md:hidden" onClick={()=>{
                                setIsOpen(false);
                            }}/>
							<img
								className="w-[220px] h-[80px] object-cover cursor-pointer"
								onClick={() => {
									navigate("/");
								}}
								src="/white-remove-bg.png"
								alt="Logo"
							/>
						</div>
						<div className="w-full h-full flex flex-col p-[45px] items-start">
							<button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/");
								}}
							>
								<HiHome className="text-pink-600 text-2xl mr-2" />
								Home
							</button>
                            {/* products */}
                            <button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/products");
								}}
							>
								<BiLogoProductHunt className="text-pink-600 text-2xl mr-2" />
								Products
							</button>
							{/* reviews */}
							<button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/reviews");
								}}
							>
								<MdReviews className="text-pink-600 text-2xl mr-2" />
								Reviews
							</button>

							{/* about us */}
							<button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/about-us");
								}}
							>
								<IoIosPeople className="text-pink-600 text-2xl mr-2" />
								About Us
							</button>

							{/* contact us */}
							<button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/contact-us");
								}}
							>
								<MdContactPhone className="text-pink-600 text-2xl mr-2" />
								Contact Us
							</button>
							{/* cart */}
							<button
								className="text-pink-600 text-2xl flex flex-row items-center pb-2"
								onClick={() => {
									setIsOpen(false);
									navigate("/cart");
								}}
							>
								<BiSolidCart className="text-pink-600 text-2xl mr-2" />
								Cart
							</button>
							{/* account */}
							{token == null ? (
								<button
									className="text-pink-600 text-2xl flex flex-row items-center pb-2"
									onClick={() => {
										setIsOpen(false);
										navigate("/login");
									}}
								>
									<FaSignInAlt className="text-pink-600 text-2xl mr-2" />
									Login
								</button>	
							) : (
								<button
									className="text-pink-600 text-2xl flex flex-row items-center pb-2"
									onClick={() => {
										setIsOpen(false);
										navigate("/account");
									}}
								>
									<MdAccountCircle className="text-pink-600 text-2xl mr-2" />
									My Account
								</button>
							)}
						</div>
					</div>
				</div>
			)}
			
			<GiHamburgerMenu className="text-white text-3xl absolute md:hidden left-[10px]" onClick={
                ()=>{
                    setIsOpen(true);
                }
            }/>

			<img
				className="w-[300px] h-[100px] object-cover absolute md:left-[50px] cursor-pointer"
				onClick={() => {
					navigate("/");
				}}
				src="/white-remove-bg.png"
				alt="Logo"
			/>

			<div className="hidden w-full md:flex justify-center items-center">
				<Link to="/" className="text-white text-xl hover:scale-105 ">
					Home
				</Link>
				<Link to="/products" className="ml-6 text-white text-xl hover:scale-105">
					Products
				</Link>
				<Link to="/reviews" className="ml-6 text-white text-xl hover:scale-105">
					Reviews
				</Link>
				<Link to="/about-us" className="ml-6 text-white text-xl hover:scale-105">
					About Us
				</Link>
				<Link to="/contact-us" className="ml-6 text-white text-xl hover:scale-105">
					Contact Us
				</Link>
				<Link to="/cart" className="ml-6 text-white text-xl hover:scale-105">
					<BiSolidCart className="text-white text-3xl ml-4" />
				</Link>
			</div>

			<div className="absolute right-[10px] md:right-[50px] flex flex-row items-center">
				{token == null ? (
					<Link to="/login" className="text-white text-xl ml-4">
						<FaSignInAlt className="text-white text-2xl ml-4" /> Login
					</Link>
				) : (
					<Link to="/account" className="text-white text-xl ml-4">
						<MdAccountCircle className="text-white text-3xl ml-4" />
					</Link>
				)}

				{token != null && 
					<button className="absolute right-[60px] text-white text-xl ml-4" 
						onClick={
							()=>{
								localStorage.removeItem("token");
								navigate("/login");
							}
					}
					>
						<FaSignOutAlt className="text-white text-2xl ml-4" />
					</button>
				}
			</div>
		</header>
	);
}
