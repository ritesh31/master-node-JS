const express = require("express");
const { connectMongoDB } = require("./connection");

const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;
const DB_URL = "mongodb://127.0.0.1:27017/short-url";

// DB Connection
connectMongoDB(DB_URL)
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.log("MongoDB error", err));

app.use(express.json());
app.use("/api/url", urlRoute);

app.use("/", urlRoute);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
