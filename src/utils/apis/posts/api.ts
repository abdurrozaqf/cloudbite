import { Response, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { PostPayloadSchema } from "./types";


export const getPosts = async (url: string) => {
  try {
    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailPosts = async (post_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/posts/${post_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addPosts = async (body: PostPayloadSchema) => {
  try {
    const response = await axiosWithConfig.post(`/posts`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const editPosts = async (post_id: string, body: PostPayloadSchema) => {
  try {
    const response = await axiosWithConfig.put(`/posts/${post_id}`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deletePosts = async (post_id: string) => {
  try {
    const response = await axiosWithConfig.delete(`/posts/${post_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
