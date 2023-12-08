import {
  getPosts,
  getDetailPosts,
  addPosts,
  editPosts,
  deletePosts,
} from "./api";
import { DetailPost, Post, PostPayloadSchema } from "./types";

export { getPosts, getDetailPosts, addPosts, editPosts, deletePosts };
export type { Post, DetailPost, PostPayloadSchema };
