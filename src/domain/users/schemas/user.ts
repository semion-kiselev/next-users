import { z } from "zod";

export type User = {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
};

export const CreateUserPayload = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(72),
  permissions: z.array(z.string().length(2)).min(1),
});

export type CreateUserPayloadType = z.infer<typeof CreateUserPayload>;

export const DeleteUserParams = z.object({
  id: z.coerce.number().positive().max(2147483647),
});

export type DeleteUserParamsType = {
  id: string;
};
