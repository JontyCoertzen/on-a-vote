import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@db/client";
import { createRouter } from "./context";
import { CreateQuestionValidtor } from "@shared/CreateQuestionValidator";

export const questionRouter = createRouter()
  .query("get-all-my-questions", {
    async resolve({ ctx }) {
      return await prisma.pollQuestion.findMany({
        where: {
          ownerToken: ctx.token,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      });

      const myVote = await prisma.vote.findFirst({
        where: {
          questionId: input.id,
          voterToken: ctx.token,
        },
      });

      return { question, vote: myVote };
    },
  })
  .mutation("create", {
    input: CreateQuestionValidtor,
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: input.options,
          ownerToken: ctx?.token,
        },
      });
    },
  })
  .mutation("vote-on-question", {
    input: z.object({
      questionId: z.string(),
      option: z.number().min(0).max(10),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) throw new Error("Unauthorized");

      return await prisma.vote.create({
        data: {
          questionId: input.questionId,
          choice: input.option,
          voterToken: ctx?.token,
        },
      });
    },
  });
