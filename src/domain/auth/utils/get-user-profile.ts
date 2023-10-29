import { authorize } from "@/domain/auth/utils/authorize";
import { getUser } from "@/domain/users/api/controllers/get-user/get-user.service";
import { User } from "@/domain/users/types";
import { normalizeUser } from "@/domain/users/utils/normalize-user";

export const getUserProfile = async (token?: string): Promise<User | null> => {
  try {
    if (!token) return null;
    const userId = await authorize({ token, guardPermissions: [] });
    const user = await getUser(userId);
    return normalizeUser(user);
  } catch (e) {
    return null;
  }
};
