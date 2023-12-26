const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
// Added because we are getting req.body undefined for POST reqeust
// Form data added into request body
app.use(express.urlencoded({ extended: true }));

// Routes
app
  .route("/api/users/:id")
  // .get((req, res) => {
  //   return res.json({ status: "Pending" });
  // })
  .patch((req, res) => {
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

// REST API

// Get users list as HTML
app.get("/users", (req, res) => {
  const usersHTML = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
  `;
  res.send(usersHTML);
});

// Get users list as JSON
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.post("/api/users", (req, res) => {
  // Todo: Create new user
  let body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length + 1 });
  });
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
