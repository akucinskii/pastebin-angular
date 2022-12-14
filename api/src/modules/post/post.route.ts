import { FastifyInstance } from "fastify/types/instance";
import { createPostHandler, getPostHandler } from "./post.controller";
import { $ref } from "./post.schema";

export const postRoutes = async (server: FastifyInstance) => {
  server.post(
    "/",
    {
      schema: {
        response: {
          201: $ref("postResponseSchema"),
        },
      },
    },
    createPostHandler
  );

  server.get(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "string" },
        },
      },
    },
    getPostHandler
  );
};
