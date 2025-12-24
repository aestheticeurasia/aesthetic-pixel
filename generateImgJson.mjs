import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, "public", "images");
const outputJson = {};

function scanFolders(dir, categoryName = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  items.forEach((item) => {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      scanFolders(fullPath, item.name); 
      const relativePath = `/portfolioItems/${categoryName}/${item.name}`;

      if (!outputJson[categoryName]) {
        outputJson[categoryName] = [];
      }

      outputJson[categoryName].push(relativePath);
    }
  });
}

scanFolders(baseDir);

fs.writeFileSync(
  path.join(__dirname, "imageData.json"),
  JSON.stringify(outputJson, null, 2)
);

console.log("✅ imageData.json generated successfully!");