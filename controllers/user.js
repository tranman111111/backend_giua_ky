import { StatusCodes } from 'http-status-codes';
import * as userService from '../services/user.js'; // Sử dụng named import

// Đăng ký người dùng
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.register({
      username,
      password,
    });
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      message: "Xử lý thành công",
      content: user,
    });
  } catch (error) {
    if (error.message === "Username đã tồn tại") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: StatusCodes.BAD_REQUEST,
        message: "Username đã tồn tại, vui lòng thử lại với email khác",
      });
    }
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Đăng nhập người dùng
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { accessToken, user } = await userService.login({ // Sử dụng userService.login
      username,
      password,
    });

    return res.status(StatusCodes.OK).json({
      status: 200,
      message: "Xử lý thành công",
      content: user,
      accessToken,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};
