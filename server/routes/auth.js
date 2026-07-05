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
    // Resolve the admin robustly. This is a single-admin system and legacy rows
    // may have a NULL id (the admin table was created without an id sequence),
    // so we look up by the token's id when it is valid and otherwise fall back
    // to the only admin record.
    const tokenId = req.admin?.id;
    let admin = null;
    if (tokenId != null) {
      admin = await prisma.admin.findUnique({ where: { id: tokenId } });
    }
    if (!admin) {
      admin = await prisma.admin.findFirst();
    }

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

    // Update by the unique username (always present) instead of the id, which
    // may be NULL on legacy rows and would silently match no row.
    await prisma.admin.update({
      where: { username: admin.username },
      data: dataToUpdate,
    });

    res.json({ msg: "Credentials updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
