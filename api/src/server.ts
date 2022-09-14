import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { withRefResolver } from "fastify-zod";
import { postSchemas } from "./modules/post/post.schema";
import { postRoutes } from "./modules/post/post.route";
import swagger from "@fastify/swagger";
import cors from "@fastify/cors";
import { JWT } from "@fastify/jwt";
import { userSchemas } from "./modules/user/user.schema";
import userRoutes from "./modules/user/user.route";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

function buildServer() {
  const server = fastify({
    logger: true,
  });

  server.register(cors);

  for (const schema of [...postSchemas, ...userSchemas]) {
    server.addSchema(schema);
  }

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.register(require("@fastify/jwt"), {
    secret: "supersecret",
  });

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/docs",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "Fastify API",
          description: "API for some products",
          version: "4.2.0",
        },
      },
    })
  );

  server.register(userRoutes, { prefix: "api/user" });
  server.register(postRoutes, { prefix: "api/post" });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  return server;
}

export default buildServer;
