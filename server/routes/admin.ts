import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "./user";
import path from "path";
import { promises as fs } from "fs";

const prisma = new PrismaClient();

export const getAdminSettings: RequestHandler = async (req, res) => {
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
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    let settings = await prisma.adminSettings.findFirst();

    if (!settings) {
      settings = await prisma.adminSettings.create({
        data: {},
      });
    }

    return res.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("Get admin settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateAdminSettings: RequestHandler = async (req, res) => {
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
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const {
      companyName,
      primaryColor,
      secondaryColor,
      footerTeam,
      analyticsData,
    } = req.body;

    let settings = await prisma.adminSettings.findFirst();

    if (!settings) {
      settings = await prisma.adminSettings.create({
        data: {
          companyName: companyName || "PlastiSide",
          primaryColor: primaryColor || "#2ECC71",
          secondaryColor: secondaryColor || "#1A73E8",
          footerTeam: footerTeam ? JSON.stringify(footerTeam) : undefined,
          analyticsData: analyticsData
            ? JSON.stringify(analyticsData)
            : undefined,
        },
      });
    } else {
      settings = await prisma.adminSettings.update({
        where: { id: settings.id },
        data: {
          companyName: companyName || undefined,
          primaryColor: primaryColor || undefined,
          secondaryColor: secondaryColor || undefined,
          footerTeam: footerTeam ? JSON.stringify(footerTeam) : undefined,
          analyticsData: analyticsData
            ? JSON.stringify(analyticsData)
            : undefined,
        },
      });
    }

    return res.json({
      success: true,
      message: "Settings updated",
      settings,
    });
  } catch (error) {
    console.error("Update admin settings error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const uploadLogo: RequestHandler = async (req, res) => {
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
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    if (!req.files || !req.files.logo) {
      return res.status(400).json({
        success: false,
        message: "No file provided",
      });
    }

    const logo = Array.isArray(req.files.logo)
      ? req.files.logo[0]
      : req.files.logo;
    const filename = `logo-${Date.now()}.png`;
    const filepath = path.join(process.cwd(), "public", "logos", filename);

    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(filepath), { recursive: true });

    // Move file
    await logo.mv(filepath);

    let settings = await prisma.adminSettings.findFirst();

    if (!settings) {
      settings = await prisma.adminSettings.create({
        data: {
          logoUrl: `/logos/${filename}`,
        },
      });
    } else {
      settings = await prisma.adminSettings.update({
        where: { id: settings.id },
        data: {
          logoUrl: `/logos/${filename}`,
        },
      });
    }

    return res.json({
      success: true,
      message: "Logo uploaded successfully",
      logoUrl: settings.logoUrl,
    });
  } catch (error) {
    console.error("Upload logo error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAnalytics: RequestHandler = async (req, res) => {
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
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const totalUsers = await prisma.user.count();
    const totalSubmissions = await prisma.submission.count();
    const totalPoints = await prisma.user.aggregate({
      _sum: {
        points: true,
      },
    });

    const submissionsByType = await prisma.submission.groupBy({
      by: ["plasticType"],
      _sum: {
        weight: true,
      },
    });

    return res.json({
      success: true,
      analytics: {
        totalUsers,
        totalSubmissions,
        totalPoints: totalPoints._sum.points || 0,
        submissionsByType,
      },
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers: RequestHandler = async (req, res) => {
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
    });

    if (user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        points: true,
        rank: true,
        createdAt: true,
      },
    });

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUserStatus: RequestHandler = async (req, res) => {
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

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (admin?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const { userId, status } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
    });

    return res.json({
      success: true,
      message: "User status updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user status error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
