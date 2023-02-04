import { prisma } from "../../utils/prisma";
import { postRoutes } from "./post.route";
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
  });
  return post;
};

export const getUserPosts = async (userId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(posts);
  return posts;
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
