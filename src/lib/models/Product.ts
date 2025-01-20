import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: String,
        category: String,
        price: Number,
        imageUrl: String,
        isActive: Boolean,
    },
    { collection: "MenuItem" });

export default mongoose.models.Product || mongoose.model("Product", productSchema);


// import { Schema, model, models } from "mongoose";

// const productSchema = new Schema({
//     title:{type: String, require:true},
//     imageUrl:{type: String, require:true},
//     category:{type: String, require:true},
//     price:{type: Number, require:true},
// })

// const Product = models.Product || model("Product", productSchema);

// export default Product;