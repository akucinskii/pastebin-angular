import { FastifyRequest } from "fastify/types/request";
import { checkLogin } from "../../utils/checkLogin";
import { CreatePostInput } from "./post.schema";
import { createPost, getPost, getUserPosts, updateTotalViews } from "./post.service";
import {UserParams} from './post.schema'

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
  request: FastifyRequest<{ Params: UserParams }>
) => {
  await updateTotalViews(request.params.id);

  const post = await getPost(request.params.id);

  return post;
};


export const getUserPostsHandler = async (request: FastifyRequest<{Params: UserParams}>) => {
  

  const posts = await getUserPosts(request.params.id);


  return posts
}
