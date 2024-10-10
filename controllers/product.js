import * as productService from '../services/product.js';
import { StatusCodes } from 'http-status-codes';

// Thêm sản phẩm
export const addProduct = async (req, res) => {
  try {
    const product = await productService.addProduct(req.body);
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: 'Thêm sản phẩm thành công',
      content: product,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Thêm sản phẩm thất bại', error });
  }
};

// Lấy danh sách sản phẩm
export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Lấy danh sách sản phẩm thành công',
      content: products,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lấy danh sách sản phẩm thất bại', error });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Lấy sản phẩm thành công',
      content: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Lấy sản phẩm thất bại', error });
  }
};


// Sửa sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Sửa sản phẩm thành công',
      content: product,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Sửa sản phẩm thất bại', error });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: 'Xóa sản phẩm thành công',
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Xóa sản phẩm thất bại', error });
  }
};
