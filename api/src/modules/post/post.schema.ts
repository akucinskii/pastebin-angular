import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const postInput = {
  title: z.string().min(3).max(250),
  content: z.string(),
};

const postGenerated = {
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
};

const createPostSchema = z.object({
  ...postInput,
});

const postResponseSchema = z.object({
  ...postGenerated,
  ...postInput,
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas({
  createPostSchema,
  postResponseSchema,
});
