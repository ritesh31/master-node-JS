const User = require("../models/user");

async function getAllUsers(req, res) {
  const dbUsers = await User.find({});
  res.json(dbUsers);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json(user);
}

async function updateUserById(req, res) {
  const id = req.params.id;
  const user = await User.findByIdAndUpdate(id, { last_name: "Changed" });
  return res.status(200).json({ message: "User updated successfully" });
}

async function deleteUserById(req, res) {
  const id = req.params.id;
  const user = await User.findByIdAndDelete(id);
  return res.status(204).json({ message: "User deleted successfully" });
}

async function createUser(req, res) {
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
  return res
    .status(201)
    .json({ message: "User created successfully", id: result._id });
}
module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
};
