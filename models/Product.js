import mongoose from "mongoose";

// Định nghĩa Schema cho sản phẩm
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
