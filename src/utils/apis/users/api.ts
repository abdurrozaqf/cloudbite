import { Response } from "@/utils/types/api";
import { User, UpdateUserSchema } from "./types";
import axiosWithConfig from "../axiosWithConfig";

export const getUser = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<User>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateUser = async (body: UpdateUserSchema) => {
  try {
    const response = await axiosWithConfig.patch(`/users`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteUser = async () => {
  try {
    const response = await axiosWithConfig.delete(`/users`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
