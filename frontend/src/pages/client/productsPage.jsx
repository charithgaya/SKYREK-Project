import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("all");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
	// const [sort, setSort] = useState("");

	useEffect(() => {
		const delay = setTimeout(() => {
		setLoading(true);

		let url = "/api/products";

		const params = [];

		if (query) url += `search=${query}&`;
		if (category !== "all") url += `category=${category}&`;
		if (minPrice !== "") url += `minPrice=${minPrice}&`;
		if (maxPrice !== "") url += `maxPrice=${maxPrice}&`;
		// if (sort) url += `sort=${sort}&`;

		if (params.length > 0) {
			url += "?" + params.join("&");
		}
			axios
				.get(import.meta.env.VITE_API_URL + url)
				.then((response) => {
					setProducts(response.data);
				})
				.finally(() => {
					setLoading(false);
				});
		}, 500);
				return () => clearTimeout(delay);
	}, [query, category, minPrice, maxPrice /*, sort*/]);

	return (
		<div className="w-full h-full">
			<div className="flex gap-4 justify-center items-center p-4">
				{/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setLoading(true);
                    }}
                    className="w-48 border p-2 rounded"
                />
        
				{/* category filter */}
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="border p-2 rounded"
				>
					<option value="all">All</option>
					<option value="cosmetics">Cosmetics</option>
					<option value="skincare">Skincare</option>
					<option value="fragrance">Fragrance</option>
				</select>

				{/* Min Price */}
				<input
					type="number"
					placeholder="Min Price"
					value={minPrice}
					onChange={(e) => setMinPrice(e.target.value)}
					className="border p-2 rounded w-32"
				/>

				{/* Max Price */}
				<input
					type="number"
					placeholder="Max Price"
					value={maxPrice}
					onChange={(e) => setMaxPrice(e.target.value)}
					className="border p-2 rounded w-32"
				/>

				{/* Sort */}
				{/* <select
					value={sort}
					onChange={(e) => setSort(e.target.value)}
					className="border p-2 rounded"
				>
					<option value="">Sort By</option>
					<option value="low">Price: Low to High</option>
					<option value="high">Price: High to Low</option>
				</select> */}

				{/* <p className="text-sm text-gray-500">
					{sort === "low" && "Sorted by: Low to High"}
					{sort === "high" && "Sorted by: High to Low"}
				</p> */}

				{/* Clear Filters */}
				<button
					onClick={() => {
						setQuery("");
						setCategory("all");
						setMinPrice("");
						setMaxPrice("");
						// setSort("");
					}}
					className="border px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
				>
					Clear
				</button>
			</div>

			{loading ? (
				<Loader />
			) : (
				<div className="w-full flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
					{Array.isArray(products) && products.map((product) => {
						return <ProductCard key={product.productId} product={product} />;
					})}
				</div>
			)}
		</div>
	);
}
