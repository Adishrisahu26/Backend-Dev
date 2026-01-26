const fs = require("fs");
const path = require("path");

const command = process.argv[2];
const filePath = process.argv[3];
const data = process.argv[4];

switch (command) {
  case "read":
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) return console.log("Error:", err.message);
      console.log("File Content:\n", content);
    });
    break;

  case "write":
    fs.writeFile(filePath, data || "", (err) => {
      if (err) return console.log("Error:", err.message);
      console.log("File written successfully");
    });
    break;

  case "copy":
    const dest = process.argv[4];
    fs.copyFile(filePath, dest, (err) => {
      if (err) return console.log("Error:", err.message);
      console.log("File copied successfully");
    });
    break;

  case "delete":
    fs.unlink(filePath, (err) => {
      if (err) return console.log("Error:", err.message);
      console.log("File deleted successfully");
    });
    break;

  case "list":
    fs.readdir(filePath, (err, files) => {
      if (err) return console.log("Error:", err.message);
      console.log("Directory Contents:");
      files.forEach(file => console.log(file));
    });
    break;

  default:
    console.log("Invalid command");
}
