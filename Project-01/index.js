const express = require("express");

const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;
const DB_URL = "mongodb://127.0.0.1:27017/master-node-js";

// DB Connection
connectMongoDB(DB_URL)
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.log("MongoDB error", err));

// Middleware - Plugin
app.use(express.urlencoded({ extended: true })); // Added because we are getting req.body undefined for POST reqeust
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
