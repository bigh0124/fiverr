import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import reviewRoute from "./routes/review.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import gigRoute from "./routes/gig.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessge = err.message || "Something went wrong";

  res.status(errorStatus).send(errorMessge);
});

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

app.listen(8800, () => {
  connect();
  console.log("backend server is running");
});
