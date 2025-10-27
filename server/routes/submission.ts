import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./user";
import path from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

const PLASTIC_TYPES = {
  PET: 10,
  HDPE: 15,
  PVC: 8,
  LDPE: 12,
  PP: 14,
  PS: 9,
  Other: 5,
};

const calculateRank = (points: number): string => {
  if (points >= 5000) return "Platinum";
  if (points >= 3000) return "Gold";
  if (points >= 1000) return "Silver";
  return "Bronze";
};

export const createSubmission: RequestHandler = async (req, res) => {
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

    const { plasticType, weight, quantity, location, description } = req.body;

    if (!plasticType || !weight || !quantity || !location) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Calculate points
    const typeMultiplier =
      PLASTIC_TYPES[plasticType as keyof typeof PLASTIC_TYPES] || 5;
    const pointsEarned = Math.floor(weight * quantity * (typeMultiplier / 10));

    // Upload photo if provided
    let photoUrl: string | undefined;
    if (req.files && req.files.photo) {
      const photo = Array.isArray(req.files.photo)
        ? req.files.photo[0]
        : req.files.photo;
      const filename = `${decoded.id}-${Date.now()}.jpg`;
      const filepath = path.join(
        process.cwd(),
        "public",
        "submissions",
        filename,
      );

      // Create directory if it doesn't exist
      await fs.mkdir(path.dirname(filepath), { recursive: true });

      // Move file
      await photo.mv(filepath);
      photoUrl = `/submissions/${filename}`;
    }

    // Create submission
    const submission = await prisma.submission.create({
      data: {
        userId: decoded.id,
        plasticType,
        weight: parseFloat(weight),
        quantity: parseInt(quantity),
        location,
        description,
        photoUrl,
        pointsEarned,
        status: "pending",
      },
    });

    // Update user points
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (user) {
      const newPoints = user.points + pointsEarned;
      const newRank = calculateRank(newPoints);

      await prisma.user.update({
        where: { id: decoded.id },
        data: {
          points: newPoints,
          rank: newRank,
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Submission created successfully",
      submission,
    });
  } catch (error) {
    console.error("Create submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSubmissions: RequestHandler = async (req, res) => {
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

    const submissions = await prisma.submission.findMany({
      where: { userId: decoded.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("Get submissions error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllSubmissions: RequestHandler = async (req, res) => {
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

    // Check if admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const submissions = await prisma.submission.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return res.json({
      success: true,
      submissions,
    });
  } catch (error) {
    console.error("Get all submissions error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifySubmission: RequestHandler = async (req, res) => {
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

    // Check if admin or collector
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || (user.role !== "admin" && user.role !== "collector")) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const { submissionId, status } = req.body;

    if (!submissionId || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const submission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status,
        verifiedBy: decoded.id,
        verifiedAt: new Date(),
      },
    });

    return res.json({
      success: true,
      message: "Submission verified",
      submission,
    });
  } catch (error) {
    console.error("Verify submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
