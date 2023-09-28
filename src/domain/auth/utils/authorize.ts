import { pool } from "@/db/db";
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

  const { userId, iat: tokenIssueTime } = await jwt
    .verify<{ userId: number; iat: number }>(token)
    .catch(() => {
      throw unauthorized();
    });

  const tokenExpiredTime = await getTokenExpiredTime(userId);

  if (tokenIssueTime <= tokenExpiredTime) {
    throw unauthorized();
  }

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

async function getTokenExpiredTime(userId: number) {
  const token_expired_at = await pool
    .query<{ token_expired_at: string }>(
      "SELECT token_expired_at FROM employee WHERE id = $1",
      [userId],
    )
    .then((result) => result.rows[0].token_expired_at);

  return Math.ceil(new Date(token_expired_at).getTime() / 1000);
}
