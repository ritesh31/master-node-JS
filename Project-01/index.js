const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/master-node-js")
  .then(() => console.log("MongoDB connect successfully"))
  .catch((err) => console.log("MongoDB error", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true } //Add this timestamps to add created & updated time for record in DB
);

const User = mongoose.model("user", userSchema);

// Middleware - Plugin
// Added because we are getting req.body undefined for POST reqeust
// Form data added into request body
app.use(express.urlencoded({ extended: true }));

// REST API

// Get users list as HTML
app.get("/users", async (req, res) => {
  const dbUsers = await User.find({});
  const usersHTML = `
    <ul>
      ${dbUsers
        .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
        .join("")}
    </ul>
  `;
  res.send(usersHTML);
});

// Get users list as JSON
app.get("/api/users", async (req, res) => {
  const dbUsers = await User.find({});
  res.json(dbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, { last_name: "Changed" });
    return res.status(201).json({ message: "User updated successfully" });
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    return res.status(201).json({ message: "User deleted successfully" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  return res.status(201).json({ message: "User created successfully" });
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
