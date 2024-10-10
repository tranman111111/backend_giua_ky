import Product from '../models/Product.js';

// Thêm sản phẩm
export const addProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  return await Product.find();
};

// Lấy sản phẩm theo ID
export const getProductById = async (id) => {
  return await Product.findById(id);
};

// Sửa sản phẩm
export const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

// Xóa sản phẩm
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
