import { FastifyRequest } from "fastify/types/request";
import { CreatePostInput } from "./post.schema";
import { createPost, getPost, updateTotalViews } from "./post.service";
import { IdParams } from "./types";

export const createPostHandler = async (
  request: FastifyRequest<{ Body: CreatePostInput }>
) => {
  const createdPost = await createPost({
    ...request.body,
  });

  return createdPost;
};

export const getPostHandler = async (
  request: FastifyRequest<{ Params: IdParams }>
) => {
  await updateTotalViews(request.params.id);

  const post = await getPost(request.params.id);

  return post;
};
