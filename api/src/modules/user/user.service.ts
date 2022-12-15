import { hashPassword } from "../../utils/hash";
import { prisma } from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

// POST


export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const { hash, salt } = hashPassword(password);

  const user = await prisma.user.create({
    data: { ...rest, salt, password: hash },
  });

  return user;
}

// GET

export async function findUserByName(name: string) {
  return prisma.user.findUnique({
    where: {
      name,
    },
  });
}

export async function findUsers() {
  return prisma.user.findMany({
    select: {
      name: true,
      id: true,
    },
  });
}



// UPDATE

export async function updateUserName(id: string, name: string ) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
    }
  });
}




