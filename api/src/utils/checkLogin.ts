import { FastifyRequest } from "fastify";

export const checkLogin = async (
  request: FastifyRequest
): Promise<{ id: string | null; name: string | null }> => {
  try {
    const user: { id: string; name: string } = await request.jwtVerify();

    return user;
  } catch {
    return { id: null, name: null };
  }
};
