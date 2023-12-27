const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
// Added because we are getting req.body undefined for POST reqeust
// Form data added into request body
app.use(express.urlencoded({ extended: true }));

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
  // Added custom response header
  res.setHeader("X-MyName", "John");  //  Always add X to custom headers
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
