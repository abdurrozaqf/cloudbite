import { Response } from "@/utils/types/api";
import { LoginSchema, RegisterSchema } from "./types";
import axiosWithConfig from "../axiosWithConfig";

export const Register = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const Login = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
