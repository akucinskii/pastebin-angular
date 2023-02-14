import { FastifyReply, FastifyRequest } from "fastify";
import { checkLogin } from "../../utils/checkLogin";
import { verifyPassword } from "../../utils/hash";
import { CreateUserInput, LoginInput } from "./user.schema";
import {
  createUser,
  findUserByName,
  findUsers,
  updateUserName,
} from "./user.service";

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    return reply.code(500).send(e);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply
) => {
  const body = request.body;

  // find a user by Username
  const user = await findUserByName(body.name);

  if (!user) {
    return reply.code(401).send({
      message: "Invalid Username or password",
    });
  }

  // verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  if (correctPassword) {
    const { password, salt, ...rest } = user;

    console.log(request.jwt.sign(rest));
    // generate access token
    return { accessToken: request.jwt.sign(rest) };
  }

  return reply.code(401).send({
    message: "Invalid email or password",
  });
};

export const getUsersHandler = async () => {
  const users = await findUsers();

  return users;
};

export const updateUsernameHandler = async (
  request: FastifyRequest<{
    Body: { name: string };
  }>
) => {
  const user: { id: string | null } = await checkLogin(request);

  const { name } = request.body;
  const { id } = user;

  if (!id) {
    return {
      message: "You are not authorized",
    };
  }

  const updatedUser = await updateUserName(id, name);

  return updatedUser;
};
