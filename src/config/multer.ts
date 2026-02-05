// src/config/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

console.log(
      "CLOUDINARY CONFIG:",
      {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
      }
)

const storage = new CloudinaryStorage({
      cloudinary,
      params: async (_req, file) => ({
            folder: "specialists",
            resource_type: file.mimetype.startsWith("video") ? "video" : "image",
            public_id: `${Date.now()}-${file.originalname}`,
      }),
});

export const upload = multer({
      storage,
      limits: { fileSize: 50 * 1024 * 1024 },
});