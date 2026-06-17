import { useEffect, useState } from "react";
import axios from "axios";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import Loader from "../../components/loader";

export default function DashboardAdminPage() {
	const [stats, setStats] = useState({
		products: 0,
		orders: 0,
		users: 0,
		revenue: 0,
	});
	const [recentOrders, setRecentOrders] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return;

		const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = import.meta.env.VITE_API_URL;

		Promise.all([
			axios.get(`${apiUrl}/api/products`),
			axios.get(`${apiUrl}/api/orders/1/1000`, { headers }),
			axios.get(`${apiUrl}/api/users/all`, { headers }),
		])
			.then(([productsRes, ordersRes, usersRes]) => {
                const products = productsRes.data;
                const ordersData = ordersRes.data.orders || [];
                const users = usersRes.data;

                const revenue = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);

				setStats({
					products: products.length,
					orders: ordersData.length,
					users: users.length,
					revenue: revenue,
				});

                // Display up to 5 recent orders
				setRecentOrders(ordersData.slice(0, 5));
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to fetch dashboard stats", err);
				setLoading(false);
			});
	}, []);

	if (loading) return <Loader />;

	return (
		<div className="w-full h-full p-8 overflow-y-auto">
			<h1 className="text-3xl font-bold text-pink-900 mb-8">Dashboard Overview</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				{/* Revenue Card */}
				<div className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl p-6 shadow-xl text-white flex items-center justify-between transition-transform hover:scale-105">
					<div>
						<p className="text-pink-100 text-sm font-semibold uppercase tracking-wider">Total Revenue</p>
						<p className="text-3xl font-bold mt-1">${stats.revenue.toFixed(2)}</p>
					</div>
					<div className="bg-white/20 p-4 rounded-xl">
						<FaMoneyBillWave className="text-3xl" />
					</div>
				</div>

				{/* Orders Card */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 flex items-center justify-between transition-transform hover:scale-105">
					<div>
						<p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Orders</p>
						<p className="text-3xl font-bold text-pink-900 mt-1">{stats.orders}</p>
					</div>
					<div className="bg-pink-100 p-4 rounded-xl text-pink-600">
						<GiShoppingBag className="text-3xl" />
					</div>
				</div>

				{/* Products Card */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 flex items-center justify-between transition-transform hover:scale-105">
					<div>
						<p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Products</p>
						<p className="text-3xl font-bold text-pink-900 mt-1">{stats.products}</p>
					</div>
					<div className="bg-pink-100 p-4 rounded-xl text-pink-600">
						<FaBoxArchive className="text-3xl" />
					</div>
				</div>

				{/* Users Card */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 flex items-center justify-between transition-transform hover:scale-105">
					<div>
						<p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total Users</p>
						<p className="text-3xl font-bold text-pink-900 mt-1">{stats.users}</p>
					</div>
					<div className="bg-pink-100 p-4 rounded-xl text-pink-600">
						<IoPeople className="text-3xl" />
					</div>
				</div>
			</div>

			<div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
				<h2 className="text-xl font-bold text-pink-900 mb-6">Recent Orders</h2>
				{recentOrders.length === 0 ? (
					<p className="text-gray-500">No orders found.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="bg-pink-50 text-pink-900 border-b border-pink-100">
									<th className="p-4 font-semibold">Order ID</th>
									<th className="p-4 font-semibold">Customer</th>
									<th className="p-4 font-semibold">Date</th>
									<th className="p-4 font-semibold">Total</th>
									<th className="p-4 font-semibold">Status</th>
								</tr>
							</thead>
							<tbody>
								{recentOrders.map((order) => (
									<tr key={order._id || order.orderID} className="border-b border-pink-50 hover:bg-pink-50/50 transition-colors">
										<td className="p-4 font-medium text-pink-700">{order.orderID}</td>
										<td className="p-4">{order.name}</td>
										<td className="p-4 text-gray-500">{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
										<td className="p-4 font-semibold">${order.total?.toFixed(2)}</td>
										<td className="p-4">
											<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
												order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
												order.status === "completed" ? "bg-green-100 text-green-700" :
												order.status === "cancelled" ? "bg-red-100 text-red-700" :
												"bg-blue-100 text-blue-700"
											}`}>
												{order.status || "Processing"}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
