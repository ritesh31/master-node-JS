const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware - Plugin
// Added because we are getting req.body undefined for POST reqeust
// Form data added into request body
app.use(express.urlencoded({ extended: true }));

// Middleware
// 1. Middleware functions have access to the request object(req) & response object(res) &
//    the next middleware function in the application's request-response cycle.
// 2. Execute any code
// 3. Make changes to the request & response objects
// 4. End the request cycle
// 5. Call the next middleware function in the stack

// Middleware 1
app.use((req, res, next) => {
  console.log("This is Middleware 1");
  req.defaultUserName = "Sam";
  next();
});

// Middleware 2
app.use((req, res, next) => {
  console.log("This is Middleware 2");
  next();
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
  console.log("Default UserName - ", req.defaultUserName);
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
