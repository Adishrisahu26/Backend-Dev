const fs = require("fs");
const path = require("path");

const sourceDir = "./source";
const targetDir = "./target";

function syncDirectories(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  const files = fs.readdirSync(src);

  files.forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isFile()) {
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied: ${file}`);
      }
    }
  });
}

try {
  syncDirectories(sourceDir, targetDir);
  console.log("Synchronization complete");
} catch (err) {
  console.log("Error:", err.message);
}
