import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// @route    POST api/auth/login
// @desc     Authenticate admin & get token
// @access   Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    let admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

import auth from "../middleware/auth.js";

// @route    PUT api/auth/change-credentials
// @desc     Change admin username and/or password
// @access   Private (Admin)
router.put("/change-credentials", auth, async (req, res) => {
  const { currentPassword, newUsername, newPassword } = req.body;

  try {
    const adminId = req.user?.id || req.admin?.id; // depending on how auth middleware sets it length
    // Wait, let's verify how auth middleware sets it. Usually req.admin = decoded.admin.
    // I should check `middleware/auth.js` but let me use a generic fetch if ID is available, or just fetch the first admin since it's a single admin setup. Wait, auth middleware decoding will give req.admin.id.
    // Let me check req.admin?.id
    
    // Instead of querying by ID from middleware (in case it's named differently), we can try to fetch the first admin or rely on req.admin.id
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin ? req.admin.id : 1 }
    });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect current password" });
    }

    const dataToUpdate = {};
    if (newUsername) {
      dataToUpdate.username = newUsername;
    }
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(newPassword, salt);
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: dataToUpdate,
    });

    res.json({ msg: "Credentials updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
