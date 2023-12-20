const http = require("http");
const fs = require("fs");
// To parse url
const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from home page");
});

app.get("/about", (req, res) => {
  return res.send(`Hello from about page. Hi, ${req.query.name}`);
});

app.get("/contact", (req, res) => {
  return res.send("Hello from contact page");
});

// const myHandler = (req, res) => {
//   const log = `${Date.now()}: Request received for ${req.url} \n`;

//   // To extract query params from URL as object we need to pass 'true' as 2nd parameter
//   const myUrl = url.parse(req.url, true);
//   console.log(myUrl);

//   fs.appendFile("./log.txt", log, (err, response) => {
//     switch (myUrl.pathname) {
//       case "/":
//         res.end("Hello from Home");
//         break;
//       case "/about":
//         const username = myUrl.query.name;
//         console.log(username);
//         res.end(`Hello, ${username}`);
//         break;
//       case "/contact":
//         res.end("Hello from Contact");
//         break;
//       case "/search":
//         const searchParam = myUrl.query.search;
//         res.end(`Search for ${searchParam}`);
//         break;
//       default:
//         res.end("404 Not Found");
//         break;
//     }
//   });
// };

// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server is listening on port 8000"));
app.listen(8000, () => console.log("Server is listening on port 8000"));
