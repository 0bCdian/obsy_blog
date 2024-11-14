import { basePath } from "./constants.js";
import { join } from "node:path";
import { getBlogPathWithImages, processPostImages } from "./functions.js";
const postsWithImages = getBlogPathWithImages(basePath);

for (const [mdFileName, imageFiles] of postsWithImages) {
  const mdFilePath = join(basePath, mdFileName);
  await processPostImages(basePath, imageFiles, mdFilePath);
}
