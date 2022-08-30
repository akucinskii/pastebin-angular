import buildServer from "./server";

const server = buildServer();

const port = Number(process.env.PORT) || 3000;

async function main() {
  try {
    server.listen({ port: port, host: "0.0.0.0" });

    console.log(`Server ready at http://localhost:3000`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
