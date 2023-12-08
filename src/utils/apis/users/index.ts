import { getUser, updateUser, deleteUser } from "./api";
import { User, UpdateUserSchema, updateUserSchema, UserPosts } from "./types";

export { getUser, updateUser, deleteUser, updateUserSchema };
export type { User, UserPosts, UpdateUserSchema };
