import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLinkSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
      const { message } = req.body;
      if (!message) {
        res.status(400).json({ message: "Message is required" });
        return;
      }

      const config = await storage.getChatConfig();

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
      res.status(500).json({ 
        message: "Failed to generate AI response. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}