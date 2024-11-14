import cloudinary from "./cloudinaryConfig.js";
import { readdirSync, rmSync } from "node:fs";
import { lstatSync, readFileSync, writeFileSync } from "node:fs";
import { join, basename, extname } from "node:path";

/**
 * Represents a local image file.
 * @typedef {Object} LocalImage
 * @property {string} path - The file path of the local image.
 * @property {string} fileName - The name of the local image file.
 */

/**
 * Represents a URL.
 * @typedef {string} URL
 */

/**
 * Uploads a single local image to Cloudinary and returns the corresponding URL.
 *
 * @async
 * @function
 * @param {LocalImage} image - A local image object, containing a file path and file name.
 * @returns {Promise<URL>} - A Promise that resolves to the Cloudinary URL of the uploaded image.
 * @throws {Error} - Throws an error if there's a problem uploading the image.
 */
async function uploadImage(image) {
  try {
    const uploadResult = await cloudinary.uploader.upload(image.path);
    const url = cloudinary.url(uploadResult.public_id, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "webp",
        },
      ],
      secure: true,
      sign_url: true,
    });
    return url;
  } catch (error) {
    console.error(`Error uploading image "${image.fileName}":`, error);
    throw error;
  }
}

/**
 * Replaces image references in a Markdown file with their corresponding Cloudinary URLs.
 *
 * @function
 * @param {Map<string, URL>} imagesMap - A Map where the keys are the image file names and the values are the corresponding Cloudinary URLs.
 * @param {string} mdFilePath - The file path of the Markdown file.
 */
function replaceImgReferences(imagesMap, mdFilePath) {
  let content = readFileSync(mdFilePath, "utf8");

  for (const [fileName, url] of imagesMap) {
    const regex = new RegExp(`!\\[(.*?)\\]\\(.*?${fileName}\\)`, "g");
    content = content.replace(regex, `![$1](${url})`);
  }

  writeFileSync(mdFilePath, content);
}

/**
 * Deletes the image directories associated with a blog post.
 *
 * @function
 * @param {string[]} imageDirs - An array of image directories paths.
 */
function deleteImageDirs(imageDirs) {
  for (const imageDir of imageDirs) {
    try {
      rmSync(imageDir, { recursive: true, force: true });
      console.log(`Deleted image directory: ${imageDir}`);
    } catch (error) {
      console.error(`Error deleting image directory "${imageDir}":`, error);
    }
  }
}

function listDirs(path) {
  const contents = readdirSync(path);
  const dirs = contents.filter(item => isDir(join(path, item)));
  return dirs;
}

/**
 * Retrieves the blog post md files and their associated image directories.
 * @param {string} basePath - The base path where the blog posts are located.
 * @returns {Map<string, string[]>} - A Map where the keys are the .md filenames,
 *                                   and the values are arrays of image file names.
 */
function getBlogPathWithImages(basePath) {
  const postDirMap = new Map();

  // List all the _img directories
  const imageDirs = listDirs(basePath);
  for (const dir of imageDirs) {
    // infer the .md filename from the _img dir
    const regex = /_img/;
    const mdFile = dir.replace(regex, "").concat(".md");
    const dirPath = join(basePath, dir);
    const images = readdirSync(dirPath);
    postDirMap.set(mdFile, images);
  }

  return postDirMap;
}

/**
 * Checks if the given path is a directory.
 * @param {string} filePath - The path to check.
 * @returns {boolean} - `true` if the path is a directory, `false` otherwise.
 */
function isDir(filePath) {
  try {
    return lstatSync(filePath).isDirectory();
  } catch (e) {
    return false;
  }
}

/**
 * Processes a single blog post, including uploading images, replacing image references, and deleting the image directory.
 *
 * @async
 * @function
 * @param {string} basePath - The base path where the blog posts are located.
 * @param {string} postDir - The name of the blog post directory.
 * @param {string[]} imageFiles - An array of image file names associated with the blog post.
 * @param {string} mdFilePath - The file path of the blog post's Markdown file.
 * @returns {Promise<Map<string, URL>>} - A Promise that resolves to a Map where the keys are the image file names and the values are the corresponding Cloudinary URLs.
 */
async function processPostImages(basePath, imageFiles, mdFilePath) {
  const imageDirs = [];
  const localImages = imageFiles.map(fileName => {
    const imageDirName = `${basename(mdFilePath, extname(mdFilePath))}_img`;
    imageDirs.push(join(basePath, imageDirName));
    const localImage = {
      path: join(basePath, imageDirName, fileName),
      fileName,
    };
    return localImage;
  });

  const imagesMap = await uploadImages(localImages);
  replaceImgReferences(imagesMap, mdFilePath);
  deleteImageDirs(imageDirs);

  return imagesMap;
}

/**
 * Uploads a collection of local images to Cloudinary and returns a map of image file names to their corresponding URLs.
 *
 * @async
 * @function
 * @param {LocalImage[]} images - An array of local image objects, each containing a file path and file name.
 * @returns {Promise<Map<string, URL>>} - A Promise that resolves to a Map where the keys are the image file names and the values are the corresponding Cloudinary URLs.
 * @throws {Error} - Throws an error if there's a problem uploading any of the images.
 */
async function uploadImages(images) {
  const imageUrlMap = new Map();

  for (const image of images) {
    const url = await uploadImage(image);
    imageUrlMap.set(image.fileName, url);
  }

  return imageUrlMap;
}

export { processPostImages, getBlogPathWithImages };
