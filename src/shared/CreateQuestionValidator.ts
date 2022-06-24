import { z } from "zod";

export const CreateQuestionValidtor = z.object({
  question: z.string().min(5).max(600),
});

export type CreateQuestionValidatorType = z.infer<
  typeof CreateQuestionValidtor
>;
