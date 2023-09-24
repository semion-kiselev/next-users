import { pool } from "@/db/db";
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

function getUserPermissions(userId: number): Promise<string[]> {
  return pool
    .query(
      `
    SELECT array_agg(ep.permission_id) as permissions
    FROM employee
    JOIN employee_permission ep on employee.id = ep.employee_id
    WHERE id = $1
  `,
      [userId],
    )
    .then((result) => result.rows);
}

function getIfHasAccess(userPermissions: string[], guardPermissions: string[]) {
  return guardPermissions.every((permission) =>
    userPermissions.includes(permission),
  );
}
