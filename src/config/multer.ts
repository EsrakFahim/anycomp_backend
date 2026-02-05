// src/config/multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

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