import { prisma } from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export const createPost = async (data: CreatePostInput) => {
  return prisma.post.create({
    data,
  });
};

export const getPost = async (id: string) => {
  return prisma.post.findUnique({
    where: {
      id,
    },
  });
};
