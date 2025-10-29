import "dotenv/config";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { handleDemo } from "./routes/demo";
import * as authRoutes from "./routes/auth";
import * as userRoutes from "./routes/user";
import * as submissionRoutes from "./routes/submission";
import * as adminRoutes from "./routes/admin";
import * as chatbotRoutes from "./routes/chatbot";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      abortOnLimit: true,
    })
  );

  // Serve static files
  app.use("/public", express.static(path.join(process.cwd(), "public")));
  app.use("/avatars", express.static(path.join(process.cwd(), "public", "avatars")));
  app.use("/submissions", express.static(path.join(process.cwd(), "public", "submissions")));
  app.use("/logos", express.static(path.join(process.cwd(), "public", "logos")));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/register", authRoutes.handleRegister);
  app.post("/api/auth/login", authRoutes.handleLogin);
  app.post("/api/auth/logout", authRoutes.handleLogout);
  app.post("/api/auth/verify-admin-invite", authRoutes.handleVerifyAdminInvite);

  // User routes
  app.get("/api/user/profile", userRoutes.getProfile);
  app.put("/api/user/profile", userRoutes.updateProfile);
  app.post("/api/user/avatar", userRoutes.uploadAvatar);

  // Submission routes
  app.post("/api/submissions", submissionRoutes.createSubmission);
  app.get("/api/submissions", submissionRoutes.getSubmissions);
  app.get("/api/submissions/all", submissionRoutes.getAllSubmissions);
  app.put("/api/submissions/verify", submissionRoutes.verifySubmission);

  // Admin routes
  app.get("/api/admin/settings/public", adminRoutes.getPublicSettings);
  app.get("/api/admin/settings", adminRoutes.getAdminSettings);
  app.put("/api/admin/settings", adminRoutes.updateAdminSettings);
  app.post("/api/admin/logo", adminRoutes.uploadLogo);
  app.get("/api/admin/analytics", adminRoutes.getAnalytics);
  app.get("/api/admin/users", adminRoutes.getAllUsers);
  app.put("/api/admin/users/status", adminRoutes.updateUserStatus);

  // Chatbot routes
  app.post("/api/chatbot/message", chatbotRoutes.sendMessage);
  app.post("/api/chatbot/response", chatbotRoutes.addChatbotResponse);
  app.get("/api/chatbot/responses", chatbotRoutes.getChatbotResponses);

  return app;
}
