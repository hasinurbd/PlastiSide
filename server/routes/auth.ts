import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  businessName?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatar?: string;
    points: number;
    rank: string;
  };
}

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, businessName } =
      req.body as RegisterRequest;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: role || "citizen",
        businessName: role === "collector" ? businessName : undefined,
        profile: {
          create: {},
        },
      },
    });

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        points: user.points,
        rank: user.rank,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        points: user.points,
        rank: user.rank,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLogout: RequestHandler = (_req, res) => {
  // JWT is stateless, client just deletes the token
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};

export const handleVerifyAdminInvite: RequestHandler = async (req, res) => {
  try {
    const { inviteCode, email } = req.body;

    if (!inviteCode || !email) {
      return res.status(400).json({
        success: false,
        message: "Invite code and email required",
      });
    }

    // Verify the invite code
    // For now, we'll use a simple environment variable approach
    // In production, you should use a database table to store invite codes
    const validCodes = (process.env.ADMIN_INVITE_CODES || "")
      .split(",")
      .filter(Boolean);

    if (!validCodes.includes(inviteCode.trim())) {
      return res.status(401).json({
        success: false,
        message: "Invalid invite code",
      });
    }

    // Check if user with this email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    return res.json({
      success: true,
      message: "Invite code verified successfully",
    });
  } catch (error) {
    console.error("Verify admin invite error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
