import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import path from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch {
    return null;
  }
};

export const getProfile: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role,
        points: user.points,
        rank: user.rank,
        businessName: user.businessName,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateProfile: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const { firstName, lastName, bio, location, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      },
      include: { profile: true },
    });

    if (bio !== undefined || location !== undefined || phone !== undefined) {
      await prisma.userProfile.update({
        where: { userId: decoded.id },
        data: {
          bio: bio || undefined,
          location: location || undefined,
          phone: phone || undefined,
        },
      });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        role: user.role,
        points: user.points,
        rank: user.rank,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const uploadAvatar: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    const avatar = Array.isArray(req.files.avatar)
      ? req.files.avatar[0]
      : req.files.avatar;
    const filename = `${decoded.id}-${Date.now()}.jpg`;
    const filepath = path.join(process.cwd(), "public", "avatars", filename);

    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(filepath), { recursive: true });

    // Move file
    await avatar.mv(filepath);

    // Update user
    const user = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        avatar: `/avatars/${filename}`,
      },
    });

    return res.json({
      success: true,
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Upload avatar error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
