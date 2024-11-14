import { v2 as cloudinary_instance } from "cloudinary";
process.loadEnvFile();
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;
const cloud_name = process.env.CLOUD_NAME;

if (!api_key || !api_secret) {
  throw new Error("Missing cloudinary credentials, check .env file");
}

cloudinary_instance.config({
  cloud_name,
  api_secret,
  api_key,
});
export default cloudinary_instance;
