import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { CommentSchema } from "./types";

export const addComments = async (body: CommentSchema) => {
  try {
    const response = await axiosWithConfig.post(`/comments`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteComments = async (comment_id: string) => {
  try {
    const response = await axiosWithConfig.delete(`/comments/${comment_id}`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
