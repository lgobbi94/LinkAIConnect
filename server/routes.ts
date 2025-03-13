import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLinkSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

// Initialize OpenAI with environment variable
let openai: OpenAI | null = null;
try {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key is not configured");
  } else {
    // Log API key format check (safely)
    const key = process.env.OPENAI_API_KEY;
    console.log("API Key format check:", {
      length: key.length,
      prefix: key.startsWith("sk-"),
      firstFour: key.slice(0, 4),
      lastFour: key.slice(-4)
    });

    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log("OpenAI client initialized successfully");
  }
} catch (err) {
  console.error("Failed to initialize OpenAI client:", err);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Links CRUD
  app.get("/api/links", async (_req, res) => {
    const links = await storage.getLinks();
    res.json(links);
  });

  app.post("/api/links", async (req, res) => {
    try {
      const link = insertLinkSchema.parse(req.body);
      const created = await storage.createLink(link);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid link data" });
        return;
      }
      throw err;
    }
  });

  app.patch("/api/links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const update = insertLinkSchema.partial().parse(req.body);
      const updated = await storage.updateLink(id, update);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid update data" });
        return;
      }
      throw err;
    }
  });

  app.delete("/api/links/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteLink(id);
      res.status(204).end();
    } catch (err) {
      res.status(404).json({ message: "Link not found" });
    }
  });

  // Chat configuration
  app.get("/api/chat/config", async (_req, res) => {
    const config = await storage.getChatConfig();
    res.json(config);
  });

  // Chat endpoint with OpenAI integration
  app.post("/api/chat/message", async (req, res) => {
    try {
      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY || !openai) {
        res.status(503).json({
          message: "OpenAI API key is not configured. Please contact the administrator."
        });
        return;
      }

      const { message } = req.body;
      if (!message) {
        res.status(400).json({ message: "Message is required" });
        return;
      }

      const config = await storage.getChatConfig();
      console.log("Attempting OpenAI API call with message length:", message.length);

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: config.systemPrompt },
          { role: "user", content: message }
        ],
        max_tokens: 150
      });

      const aiResponse = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
      res.json({ message: aiResponse });
    } catch (err) {
      console.error('OpenAI API Error:', err);

      // Handle authentication errors specifically
      if (err instanceof Error && err.message.includes('Incorrect API key provided')) {
        res.status(503).json({
          message: "Invalid OpenAI API key. Please check your API key configuration."
        });
        return;
      }

      res.status(500).json({ 
        message: "Failed to generate AI response. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}