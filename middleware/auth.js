import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // Kiểm tra xem token có tồn tại hay không
  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  // Kiểm tra và xác thực token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào req.user
    next(); // Tiến hành đến middleware tiếp theo
  } catch (error) {
    console.error('Error:', error.message); // In ra lỗi nếu có
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};
