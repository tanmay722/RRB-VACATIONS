import fs from "fs-extra";
import path from "path";

async function copyAssets() {
  const srcDir = path.resolve("src/assets");
  const destDir = path.resolve("public/assets");

  try {
    await fs.ensureDir(destDir);
    await fs.copy(srcDir, destDir);
    console.log("Successfully copied src/assets to public/assets");
  } catch (err) {
    console.error("Error copying assets:", err.message);
  }
}

copyAssets();
