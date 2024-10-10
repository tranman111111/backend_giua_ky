import express from 'express';
import * as productControllers from '../controllers/product.js';
import validateToken from "../middleware/verifyAccessToken.js";

const router = express.Router();

// Route thêm sản phẩm
router.post('/', productControllers.addProduct);

// Route lấy danh sách sản phẩm
router.get('/',  productControllers.getProducts);

router.get('/:id', productControllers.getProductById);

// Route sửa sản phẩm
router.put('/:id',  productControllers.updateProduct);

// Route xóa sản phẩm
router.delete('/:id',productControllers.deleteProduct);

export default router;
