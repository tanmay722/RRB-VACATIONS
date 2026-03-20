import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient();

const safeJSON = (data, defaultVal = []) => {
  if (!data) return defaultVal;
  let parsed = data;
  if (typeof data === "string") {
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      console.error("JSON Parse Error:", err, "Data:", data);
      return defaultVal;
    }
  }
  // Deep clean to remove 'undefined' or other non-JSON values that break PG binary binding
  try {
    return JSON.parse(JSON.stringify(parsed));
  } catch (err) {
    console.error("JSON Clean Error:", err);
    return defaultVal;
  }
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer with memory storage
const storage = multer.memoryStorage();

const uploadMainImage = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB
});

const uploadGalleryImages = multer({
  storage,
  limits: { fileSize: 500 * 1024 }, // 500 KB
});

// Helper for 'modern' Cloudinary upload
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "rrb_vacations" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

const getPublicIdFromUrl = (url) => {
  if (!url || !url.includes("cloudinary.com")) return null;
  const splitUrl = url.split("/upload/");
  if (splitUrl.length < 2) return null;
  // remove the "v12345/" version if present
  const pathPart = splitUrl[1].replace(/^v\d+\//, "");
  // remove the extension
  const publicId = pathPart.substring(0, pathPart.lastIndexOf("."));
  return publicId;
};

const deleteCloudinaryImage = async (url) => {
  const publicId = getPublicIdFromUrl(url);
  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.error(`Failed to delete image ${publicId} from Cloudinary:`, err);
    }
  }
};

// @route    GET api/packages
// @desc     Get all packages or filter by type
// @access   Public
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;

    const whereClause = type ? { type: type.toLowerCase() } : {};

    const packages = await prisma.package.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    const parsedPackages = packages.map(pkg => ({
      ...pkg,
      highlights: typeof pkg.highlights === 'string' ? JSON.parse(pkg.highlights) : pkg.highlights,
      itinerary: typeof pkg.itinerary === 'string' ? JSON.parse(pkg.itinerary) : pkg.itinerary,
      inclusions: typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions) : pkg.inclusions,
      exclusions: typeof pkg.exclusions === 'string' ? JSON.parse(pkg.exclusions) : pkg.exclusions,
      images: typeof pkg.images === 'string' ? JSON.parse(pkg.images) : pkg.images,
      additionalInfo: typeof pkg.additionalInfo === 'string' ? JSON.parse(pkg.additionalInfo) : pkg.additionalInfo,
    }));

    res.json(parsedPackages);
  } catch (err) {
    console.error("Prisma Error fetching packages:", err);
    res.status(500).json({
      error: "Server error",
      details: String(err),
      message: "Failed to fetch packages. Check database connection.",
    });
  }
});

// @route    GET api/packages/:id
// @desc     Get package by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!pkg) {
      return res.status(404).json({ msg: "Package not found" });
    }

    const parsedPkg = {
      ...pkg,
      highlights: typeof pkg.highlights === 'string' ? JSON.parse(pkg.highlights) : pkg.highlights,
      itinerary: typeof pkg.itinerary === 'string' ? JSON.parse(pkg.itinerary) : pkg.itinerary,
      inclusions: typeof pkg.inclusions === 'string' ? JSON.parse(pkg.inclusions) : pkg.inclusions,
      exclusions: typeof pkg.exclusions === 'string' ? JSON.parse(pkg.exclusions) : pkg.exclusions,
      images: typeof pkg.images === 'string' ? JSON.parse(pkg.images) : pkg.images,
      additionalInfo: typeof pkg.additionalInfo === 'string' ? JSON.parse(pkg.additionalInfo) : pkg.additionalInfo,
    };

    res.json(parsedPkg);
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

// @route    POST api/packages
// @desc     Create a package
// @access   Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    // Construct clean data object - NO createdAt/updatedAt!
    const rating = Number(req.body.rating);
    const reviews = Number(req.body.reviews);

    const data = {
      title: String(req.body.title || ""),
      subtitle: String(req.body.subtitle || ""),
      location: String(req.body.location || ""),
      image: String(req.body.image || ""),
      duration: String(req.body.duration || ""),
      category: String(req.body.category || ""),
      type: String(req.body.type || "domestic"),
      slug: String(req.body.slug || ""),
      overview: String(req.body.overview || ""),
      highlights: safeJSON(req.body.highlights, []),
      itinerary: safeJSON(req.body.itinerary, []),
      inclusions: safeJSON(req.body.inclusions, []),
      exclusions: safeJSON(req.body.exclusions, []),
      images: safeJSON(req.body.images, []),
      additionalInfo: safeJSON(req.body.additionalInfo || req.body.additionalinfo, {}),
      rating: !isNaN(rating) ? Math.round(rating) : 5,
      reviews: !isNaN(reviews) ? Math.round(reviews) : 0,
    };

    console.log(`POST PACKAGE - Rating: ${data.rating}, Reviews: ${data.reviews}`);
    
    const newPackage = await prisma.package.create({
      data: data,
    });
    res.json(newPackage);
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

// @route    PUT api/packages/:id
// @desc     Update a package
// @access   Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    // 🗑️ Delete old image if it's being replaced and it's an uploaded file
    const oldPkg = await prisma.package.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (oldPkg && req.body.image && oldPkg.image !== req.body.image) {
      if (oldPkg.image.startsWith("/uploads/")) {
        const fullPath = path.join(process.cwd(), oldPkg.image);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      } else if (oldPkg.image.includes("cloudinary.com")) {
        await deleteCloudinaryImage(oldPkg.image);
      }
    }

    // Construct clean update data - EXPLICITLY excluding timestamps
    // List of fields allowed by the Prisma schema (excluding auto-managed ones)
    const allowedFields = [
      "title", "subtitle", "location", "image", "duration",
      "rating", "reviews", "category", "type", "slug", "overview",
      "highlights", "itinerary", "inclusions", "exclusions", "images",
      "additionalInfo"
    ];

    const updateData = {};
    
    // Process each field with explicit type handling and NaN protection
    allowedFields.forEach(key => {
      const value = req.body[key];

      if (value !== undefined) {
        if (["rating", "reviews"].includes(key)) {
          const num = Math.round(Number(value || 0));
          updateData[key] = !isNaN(num) ? num : (key === "rating" ? 5 : 0);
        } else if (["highlights", "itinerary", "inclusions", "exclusions", "images", "additionalInfo"].includes(key)) {
          updateData[key] = safeJSON(value, key === "additionalInfo" ? {} : []);
        } else {
          updateData[key] = String(value || "");
        }
      }
    });

    console.log(`PUT PACKAGE ${req.params.id} - Rating: ${updateData.rating}, Reviews: ${updateData.reviews}`);

    const updatedPackage = await prisma.package.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
    });
    res.json(updatedPackage);
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

// @route    DELETE api/packages/:id
// @desc     Delete a package
// @access   Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (pkg && pkg.image) {
      if (pkg.image.startsWith("/uploads/")) {
        const fullPath = path.join(process.cwd(), pkg.image);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      } else if (pkg.image.includes("cloudinary.com")) {
        await deleteCloudinaryImage(pkg.image);
      }
    }

    // Also gallery images
    if (pkg && pkg.images && Array.isArray(pkg.images)) {
      for (const img of pkg.images) {
        if (img.startsWith("/uploads/")) {
          const fullPath = path.join(process.cwd(), img);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        } else if (img.includes("cloudinary.com")) {
          await deleteCloudinaryImage(img);
        }
      }
    }

    await prisma.package.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ msg: "Package removed" });
  } catch (err) {
    console.error("Prisma Error:", err);
    res.status(500).json({ error: "Server error", details: String(err) });
  }
});

// @route    POST api/packages/upload
// @desc     Upload an image
// @access   Private (Admin)
router.post("/upload", auth, (req, res) => {
  uploadMainImage.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ msg: "Main image file size should not exceed 1MB" });
      }
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: err.message });
    }
    if (!req.file) return res.status(400).json({ msg: "No file provided" });

    try {
      const result = await uploadToCloudinary(req.file.buffer);
      res.json({ url: result.secure_url });
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      res.status(500).json({ msg: "Cloudinary upload failed", error: uploadErr.message });
    }
  });
});

// @route    POST api/packages/upload/gallery
// @desc     Upload gallery images
// @access   Private (Admin)
router.post("/upload/gallery", auth, (req, res) => {
  uploadGalleryImages.array("images", 3)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ msg: "Each gallery image should not exceed 500KB" });
      }
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: err.message });
    }
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ msg: "No files provided" });

    try {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);
      const urls = results.map((res) => res.secure_url);
      res.json({ urls });
    } catch (uploadErr) {
      console.error("Cloudinary gallery upload error:", uploadErr);
      res.status(500).json({ msg: "Cloudinary upload failed", error: uploadErr.message });
    }
  });
});

export default router;
