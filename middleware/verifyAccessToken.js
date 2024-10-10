import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const validateToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  // Kiểm tra xem token có tồn tại không
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    try {
      // Xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Giả sử bạn đã lưu userId trong payload token
      next(); // Tiếp tục tới middleware hoặc route tiếp theo
    } catch (error) {
      console.error("Error verifying token:", error.message);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token is invalid or has expired",
      });
    }
  } else {
    console.error("Authorization header is missing or malformed");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "User is not authorized or token is missing",
    });
  }
};

export default validateToken;
