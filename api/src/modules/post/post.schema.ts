import { ostring, z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const postInput = {
  title: z.string().min(3).max(250),
  content: z.string(),
};



const postGenerated = {
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  total_views: z.number(),
  authorId: z.string().or(z.null()),
};



const userIdParamSchema = z.object({id: z.string()});


const createPostSchema = z.object({
  ...postInput,
});

const postResponseSchema = z.object({
  ...postGenerated,
  ...postInput,
  author: z.object({
    name: z.string(),
  }),
});

const postListResponseSchema = z.array(postResponseSchema);

export type UserParams = z.infer<typeof userIdParamSchema> 
export type CreatePostInput = z.infer<typeof createPostSchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas(
  {
    createPostSchema,
    postResponseSchema,
    userIdParamSchema,
    postListResponseSchema,
  },
  { $id: "paste" }
);
