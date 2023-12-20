const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: Request received for ${req.url} \n`;

  fs.appendFile("./log.txt", log, (err, response) => {
    switch (req.url) {
      case "/":
        res.end("Hello from Home");
        break;
      case "/about":
        res.end("Hello from About");
        break;
      case "/contact":
        res.end("Hello from Contact");
        break;
      default:
        res.end("404 Not Found");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server is listening on port 8000"));
