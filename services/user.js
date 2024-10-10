import User from '../models/User.js';
import { generateToken } from '../utils/tokenUtils.js';
import bcrypt from 'bcrypt'; // Đảm bảo bạn đã cài đặt bcrypt

// Xử lý đăng ký người dùng
export const register = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("Username đã tồn tại");
    }
    // Tạo người dùng mà không băm mật khẩu
    return await User.create({
      username,
      password: password, // Lưu mật khẩu rõ ràng (không an toàn)
    });
  } catch (error) {
    throw error; // Ném lỗi để controller xử lý
  }
};

// Xử lý đăng nhập người dùng
export const login = async ({ username, password }) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw Error("Email Not Found");
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw Error("Password Not Match");
    }

    const { accessToken } = generateToken(user?.id);
    return { accessToken, user };
  } catch (error) {
    console.log(error);
    throw error; // Ném lỗi để controller xử lý
  }
};
