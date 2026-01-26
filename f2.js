const fs = require("fs");
const readline = require("readline");

const logFile = "app.log";

let totalLines = 0;
let errorCount = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(logFile),
  crlfDelay: Infinity
});

rl.on("line", (line) => {
  totalLines++;
  if (line.includes("ERROR")) {
    errorCount++;
  }
});

rl.on("close", () => {
  console.log("Log File Summary:");
  console.log("Total Lines:", totalLines);
  console.log("Error Count:", errorCount);
});
