const fs = require("fs");
const os = require("os");

console.log(1);
// Blocking request
const blockingRes = fs.readFileSync("./test.txt", "UTF-8");
console.log(blockingRes);
console.log(2);

console.log(3);
// Non-Blocking request
fs.readFile("./test.txt", "UTF-8", (err, res) => {
  console.log(res);
});
console.log(4);
console.log(5);

// Default thread pool size is 4
// We can increase the thread pool size its depends on how much core we have in our system
// Ex.  8 core CPU -> size of thread pool 8

// To check thread size in system
console.log("Thread size: ", os.cpus().length);
