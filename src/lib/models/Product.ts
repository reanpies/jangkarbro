import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    title:{type: String, require:true},
    imageUrl:{type: String, require:true},
    category:{type: String, require:true},
    price:{type: Number, require:true},
})

const Product = models.Product || model("Product", productSchema);

export default Product;