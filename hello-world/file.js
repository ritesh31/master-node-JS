const fs = require("fs");

// Sync
fs.writeFileSync("./test.txt", "Hey there, This is NodeJS file \n");
// Async
// fs.writeFile("./test.txt", "Async data", (err) => {});

// Read file sync
// Return read data from file.
const res = fs.readFileSync("./test.txt", "UTF-8");
console.log("Read file sync mode", res);

// Read file async
// Not return data from file it return result or error in callback function
fs.readFile("./test.txt", "UTF-8", (err, result) => {
  console.log("Read file async mode", result);
});

// Append text to the file
fs.appendFileSync("./test.txt", `${Date.now()} Hey there \n`);
fs.appendFileSync("./test.txt", `${Date.now()} Hey there \n`);

// Copy file
// fs.cpSync("./test.txt", "./copy.txt");

// Delete file
// fs.unlinkSync("./copy.txt");

// Status of file
console.log(fs.statSync("./test.txt"));

// Create directory
fs.mkdirSync("./myFolder/a/b", { recursive: true });
