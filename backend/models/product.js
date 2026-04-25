import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
   
    productId : {
        type : String,
        required : true,
        unique : true
    },
    brand: {
        type: String,
        default : "Generic"
    },
    name : {
        type : String,
        required : true
    },
    altNames : {
        type : [String],
        default : []
    },
    labelledPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true,
        min: 0
    },
    images : {
        type : [String],
        default : ["/https://via.placeholder.com/300"]
    },
    description : {
        type : String,
        required : true
    },
    stock : {
        type : Number,
        required : true,
        default : 0,
        min: 0
    },
    isAvailable : {
        type : Boolean,
        default : true
    },
    category : {
        type : String,
        required : true,
        default : "cosmetics"
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviewsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

productSchema.virtual("discount").get(function(){
    return Math.round(
        ((this.labelledPrice - this.price) / this.labelledPrice) * 100
    );
});

const Product = mongoose.model("products",productSchema)
export default Product;