const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Routes
app.get("/users", (req, res) => {
  const usersHTML = `
    <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
  `;
  res.send(usersHTML);
});

// REST API
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
