import { FastifyInstance } from "fastify";
import {
  loginHandler,
  registerUserHandler,
  getUsersHandler,
  updateUsernameHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: {
        body: $ref("createUserSchema"),
        response: {
          201: $ref("createUserResponseSchema"),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        response: {
          200: $ref("loginResponseSchema"),
        },
      },
    },
    loginHandler
  );

  server.get(
    "/",
    {
      schema: {
        headers: $ref("authHeaderSchema"),
      },
      preHandler: [server.authenticate],
    },
    getUsersHandler
  );

  server.put(
    "/",
    {
      schema: {
        headers: $ref("authHeaderSchema"),
        body: $ref("updateUserNameSchema"),
        response: {
          200: $ref("updateUserNameSchema"),
        },
      },
      preHandler: [server.authenticate],
    },
    updateUsernameHandler
  );
}

export default userRoutes;
