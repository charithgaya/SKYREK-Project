import { useState, useEffect } from "react";
import API from "../services/API.js";
import ProductCard from "../components/productCard";
import Loader from "../components/loader";

export default function HomePage(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get("/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    return(
        <div>
            <p className="text-2xl text-blue-500">Welcome to the Home Page!</p>
            <p className="text-lg text-gray-700">This is where you can find the latest updates and features.</p>
            <div className="w-full flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
                {Array.isArray(products) && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}