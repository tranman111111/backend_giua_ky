import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import {routers} from "./routers/index.js"; // Giả sử routers đã được xuất khẩu từ index.js

dotenv.config(); // Tải các biến môi trường từ file .env

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Kiểm tra biến môi trường
if (!process.env.MONGODB_URI) {
  console.error("Lỗi: MONGODB_URI chưa được định nghĩa trong file .env");
  process.exit(1); // Thoát khỏi chương trình nếu không có URI
}

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Kết nối MongoDB thành công");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
  });

// Sử dụng các routes đã tách riêng
app.use("/users", routers.user);
app.use("/products", routers.product);

// Khởi động server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
