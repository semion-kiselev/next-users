import { getUserPermissions } from "@/domain/users/utils/get-user-permissions";
import { forbidden, unauthorized } from "@/errors/errors";
import { jwt } from "@/utils/api/jwt";

type Params = {
  token?: string;
  guardPermissions: string[];
};

export const authorize = async ({ token, guardPermissions }: Params) => {
  if (!token) {
    throw unauthorized();
  }

  const { userId } = await jwt.verify<{ userId: number }>(token).catch(() => {
    throw unauthorized();
  });

  const userPermissions = await getUserPermissions(userId);

  if (!getIfHasAccess(userPermissions, guardPermissions)) {
    throw forbidden();
  }

  return true;
};

function getIfHasAccess(userPermissions: string[], guardPermissions: string[]) {
  return guardPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}
