import { UserWithPermissionsFromDb } from "@/domain/users/types";
import { User } from "@/domain/users/types";
import { omit, toCamelCase } from "@/utils/entity";

export const normalizeUser = (user: UserWithPermissionsFromDb) =>
  toCamelCase(omit(user, ["token_expired_at", "password"])) as User;
