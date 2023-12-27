const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
} = require("../controllers/user");
const router = express.Router();

// Get users list as HTML
// router.get("/", async (req, res) => {
//   const dbUsers = await User.find({});
//   const usersHTML = `
//     <ul>
//       ${dbUsers
//         .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
//         .join("")}
//     </ul>
//   `;
//   res.send(usersHTML);
// });

router.route("/").get(getAllUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
