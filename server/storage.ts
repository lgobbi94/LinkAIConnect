import { links, chatConfig, type Link, type InsertLink, type ChatConfig } from "@shared/schema";

export interface IStorage {
  getLinks(): Promise<Link[]>;
  createLink(link: InsertLink): Promise<Link>;
  updateLink(id: number, link: Partial<InsertLink>): Promise<Link>;
  deleteLink(id: number): Promise<void>;
  getChatConfig(): Promise<ChatConfig>;
}

export class MemStorage implements IStorage {
  private links: Map<number, Link>;
  private chatConfig: ChatConfig;
  private currentId: number;

  constructor() {
    this.links = new Map();
    this.currentId = 1;
    
    // Default chat configuration
    this.chatConfig = {
      id: 1,
      aiName: "AI Assistant",
      aiDescription: "Your friendly AI helper",
      systemPrompt: "You are a helpful AI assistant who helps visitors learn more about the page owner."
    };
  }

  async getLinks(): Promise<Link[]> {
    return Array.from(this.links.values()).sort((a, b) => a.order - b.order);
  }

  async createLink(link: InsertLink): Promise<Link> {
    const id = this.currentId++;
    const newLink = { ...link, id, order: this.links.size + 1 };
    this.links.set(id, newLink);
    return newLink;
  }

  async updateLink(id: number, update: Partial<InsertLink>): Promise<Link> {
    const link = this.links.get(id);
    if (!link) throw new Error(`Link with id ${id} not found`);
    
    const updatedLink = { ...link, ...update };
    this.links.set(id, updatedLink);
    return updatedLink;
  }

  async deleteLink(id: number): Promise<void> {
    if (!this.links.delete(id)) {
      throw new Error(`Link with id ${id} not found`);
    }
  }

  async getChatConfig(): Promise<ChatConfig> {
    return this.chatConfig;
  }
}

export const storage = new MemStorage();
