import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function ProductsAdminPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// const [a,setA] = useState(0);
	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
				.then((res) => {
					setProducts(res.data);
					setIsLoading(false);
				});
		}
	}, [isLoading]);

	const navigate = useNavigate();

	return (
		<div className="w-full h-full p-8 flex flex-col justify-between">
			{isLoading ? (
				<Loader/>
			) : (
				<table className="w-full border-collapse border-[2px] border-pink-600">
					<thead className="border-pink-600 border-[2px]">
						<tr>
							<th className="p-[10px] text-pink-900">Image</th>
							<th className="p-[10px] text-pink-900">Product ID</th>
							<th className="p-[10px] text-pink-900">Name</th>
							<th className="p-[10px] text-pink-900">Price</th>
							<th className="p-[10px] text-pink-900">Labelled Price</th>
							<th className="p-[10px] text-pink-900">Category</th>
							<th className="p-[10px] text-pink-900">Stock</th>
							<th className="p-[10px] text-pink-900">Actions</th>
						</tr>
					</thead>

					<tbody>
						{products.map((product, index) => {
							return (
								<tr key={index}>
									<td className="p-[10px] flex flex-row justify-center items-center">
										<img
											src={product.images[0]}
											alt={product.name}
											className="w-[50px] h-[50px]"
										/>
									</td>
									<td className="p-[10px] text-center font-semibold">{product.productId}</td>
									<td className="p-[10px] text-center font-semibold">{product.name}</td>
									<td className="p-[10px] text-center font-semibold">LKR {product.price}</td>
									<td className="p-[10px] text-center font-semibold">LKR {product.labelledPrice}</td>
									<td className="p-[10px] text-center font-semibold">{product.category}</td>
									<td className="p-[10px] text-center font-semibold">{product.stock}</td>
									<td className="p-[10px] flex flex-row justify-center items-center">
										<BiTrash
											className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
											onClick={() => {
												const token = localStorage.getItem("token");
												if (token == null) {
													navigate("/login");
													return;
												}
												axios
													.delete(
														import.meta.env.VITE_BACKEND_URL +
															"/api/products/" +
															product.productId,
														{
															headers: {
																Authorization: `Bearer ${token}`,
															},
														}
													)
													.then((res) => {
														console.log("Product deleted successfully");
														console.log(res.data);
														toast.success("Product deleted successfully");
														setIsLoading(!isLoading);
													})
													.catch((error) => {
														console.error("Error deleting product:", error);
														toast.error("Failed to delete product");
													});
											}}
										/>

										<BiEdit
											onClick={() => {
												navigate("/admin/updateProduct", {
													state: product,
												});
											}}
											className="bg-pink-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px]"
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			<Link
				to={"/admin/newProduct"}
				className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-pink-700 rounded-full shadow-2xl"
			>
				<BiPlus className="text-3xl" />
			</Link>
		</div>
	);
}
