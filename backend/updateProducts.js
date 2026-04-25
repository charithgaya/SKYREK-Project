import mongoose from "mongoose";
import Product from "./models/product.js";

await mongoose.connect(process.env.MONGO_URI);

await Product.updateMany(
  {},
  {
    $set: {
      brand: "Generic",
      rating: 0,
      reviewsCount: 0,
      category: "cosmetics"
    }
  }
);

console.log("Products updated");
process.exit();