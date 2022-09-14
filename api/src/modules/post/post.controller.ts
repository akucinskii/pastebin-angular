import { FastifyRequest } from "fastify/types/request";
import { checkLogin } from "../../utils/checkLogin";
import { CreatePostInput } from "./post.schema";
import { createPost, getPost, updateTotalViews } from "./post.service";
import { IdParams } from "./types";

interface CreatePostBody extends CreatePostInput {
  authorId: string;
}

export const createPostHandler = async (
  request: FastifyRequest<{
    Body: CreatePostBody;
  }>
) => {
  const user: { id: string | null } = await checkLogin(request);

  const createdPost = await createPost(
    {
      ...request.body,
    },
    user.id
  );
  return createdPost;
};

export const getPostHandler = async (
  request: FastifyRequest<{ Params: IdParams }>
) => {
  await updateTotalViews(request.params.id);

  const post = await getPost(request.params.id);

  return post;
};
