import axios from "axios";
import {
  CreateUserPayloadType,
  UpdateUserPayloadType,
  User,
} from "@/domain/users/types";

export const getUsersApi = () =>
  axios.get<User[]>("/api/users").then((res) => res.data);

export const createUsersApi = (data: CreateUserPayloadType) =>
  axios.post<User>("/api/users", data).then((res) => res.data);

export const updateUsersApi = (id: number, data: UpdateUserPayloadType) =>
  axios.put<User>(`/api/users/${id}`, data).then((res) => res.data);

export const deleteUsersApi = (id: number) =>
  axios.delete<null>(`/api/users/${id}`);
