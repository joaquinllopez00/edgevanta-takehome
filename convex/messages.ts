import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: { message: v.string(), user: v.string() },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", { message: args.message, user: args.user });
    return messageId;
  },
});

export const getRecentMessages = query({
  args: {},
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages").order("desc").take(10);
    return messages.reverse();
  },
});
