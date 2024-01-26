import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to query");
    }
    return await ctx.db
      .query("tasks")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const send = mutation({
  args: { body: v.string() },
  handler: async (ctx, { body }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    const task = { text: body, userId: identity.subject,isCompleted: false };
    await ctx.db.insert("tasks", task);
  },
});
export const del = mutation({
  args: { id: v.id("tasks")},
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.delete(args.id)
    return newTaskId;
  },
});