import { prisma } from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export const createPost = async (
  data: CreatePostInput,
  authorId: string | null
) => {
  return prisma.post.create({
    data: { ...data, authorId },
  });
};

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return post;
};

export const updateTotalViews = async (id: string) => {
  return prisma.post.update({
    where: {
      id,
    },
    data: {
      total_views: {
        increment: 1,
      },
    },
  });
};
