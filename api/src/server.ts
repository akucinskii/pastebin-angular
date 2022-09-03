import fastify from "fastify";
import { withRefResolver } from "fastify-zod";
import { postSchemas } from "./modules/post/post.schema";
import { postRoutes } from "./modules/post/post.route";
import swagger from "@fastify/swagger";
import cors from "@fastify/cors";

function buildServer() {
  const server = fastify({
    logger: true,
  });

  server.register(cors);

  for (const schema of [...postSchemas]) {
    server.addSchema(schema);
  }

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

  server.register(postRoutes, { prefix: "api/post" });

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  return server;
}

export default buildServer;
