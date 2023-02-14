import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const createUserSchema = z.object({
  name: z.string(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});


const updateUserNameSchema = z.object({
  name: z.string(),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

const authHeaderSchema = z.object({
  authorization: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type LoginInput = z.infer<typeof loginSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
    authHeaderSchema,
    updateUserNameSchema,
  },
  { $id: "user" }
);
