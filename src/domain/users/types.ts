import { z } from "zod";
import { CreateUserPayload } from "@/domain/users/schemas/user";

export type User = {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
};

export type UserFromDb = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  token_expired_at: string;
};

export type UserWithPermissionsFromDb = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  token_expired_at: string;
  permissions: string[];
};

export type CreateUserPayloadType = z.infer<typeof CreateUserPayload>;

export type DeleteUserParamsType = {
  id: string;
};

export type GetUserParamsType = {
  id: string;
};
