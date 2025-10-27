import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_RESPONSES: { [key: string]: string } = {
  "how does plastisidework":
    "PlastiSide is a plastic recycling platform where citizens submit plastic to vending machines, earn rewards, and get ranked based on their contributions.",
  "how do i earn rewards":
    "You earn rewards by submitting plastic to our vending machines. The amount depends on the plastic type and weight submitted.",
  "how do i submit plastic":
    "Register an account, find the nearest vending machine, and submit your clean plastic items. You'll instantly earn points!",
  "what are the plastic types":
    "We accept PET, HDPE, PVC, LDPE, PP, PS, and other plastics. Each type has different point values.",
  "what is my rank":
    "Your rank is determined by your total points: Bronze (0-999), Silver (1000-2999), Gold (3000-4999), and Platinum (5000+).",
  "how do i become a buyer":
    "Register as a buyer to purchase verified plastic from our marketplace. You'll have access to bulk ordering.",
  "what is a collector":
    "Collectors manage plastic collection centers and handle verification, inventory, and payment processing.",
  "how do i contact support":
    "You can reach us at hello@plastiside.com or call +1 (555) 123-4567.",
  "is my data secure":
    "Yes, we use bank-level encryption and verified user profiles to ensure all transactions are secure.",
  "can i edit my profile":
    "Yes, you can update your profile information and upload a profile picture from your dashboard.",
};

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "No message provided",
      });
    }

    // Normalize message for matching
    const normalizedMessage = message.toLowerCase().replace(/[^\w\s]/g, "");

    // Try to find exact match in database
    let response = await prisma.chatbot.findFirst({
      where: {
        question: {
          contains: normalizedMessage,
          mode: "insensitive",
        },
      },
    });

    // If no exact match, check default responses
    if (!response) {
      for (const [key, value] of Object.entries(DEFAULT_RESPONSES)) {
        if (
          normalizedMessage.includes(key) ||
          key.includes(normalizedMessage)
        ) {
          return res.json({
            success: true,
            message: value,
            source: "default",
          });
        }
      }

      // If still no match, return a generic response
      return res.json({
        success: true,
        message:
          "I'm not sure about that. Try asking about how PlastiSide works, earning rewards, submitting plastic, or our contact information.",
        source: "default",
      });
    }

    return res.json({
      success: true,
      message: response.answer,
      source: "database",
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const addChatbotResponse: RequestHandler = async (req, res) => {
  try {
    const { question, answer, category } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Missing question or answer",
      });
    }

    const chatbot = await prisma.chatbot.create({
      data: {
        question,
        answer,
        category: category || "general",
      },
    });

    return res.status(201).json({
      success: true,
      message: "Chatbot response added",
      chatbot,
    });
  } catch (error) {
    console.error("Add chatbot response error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getChatbotResponses: RequestHandler = async (req, res) => {
  try {
    const chatbots = await prisma.chatbot.findMany();

    return res.json({
      success: true,
      chatbots,
    });
  } catch (error) {
    console.error("Get chatbot responses error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
