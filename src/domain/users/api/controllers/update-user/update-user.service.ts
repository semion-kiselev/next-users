import format from "pg-format";
import { pool } from "@/db/db";
import { UpdateUserPayloadType } from "@/domain/users/types";
import { User, UserFromDb } from "@/domain/users/types";
import { getUserPermissions } from "@/domain/users/utils/get-user-permissions";
import { normalizeUser } from "@/domain/users/utils/normalize-user";
import { getSqlWithValuesForUpdate } from "@/utils/api/get-sql-with-values-for-update";

export const updateUser = async (
  { name, email, password, permissions }: UpdateUserPayloadType,
  id: number,
): Promise<User> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const sql = `
      UPDATE employee SET %s WHERE id = $1 RETURNING *;
    `;
    const [formattedSql, values] = getSqlWithValuesForUpdate(
      sql,
      {
        name,
        email,
        password,
        token_expired_at: permissions ? "now()::timestamptz" : undefined,
      },
      [id],
    );

    const user = await client
      .query<UserFromDb>(formattedSql, values)
      .then((result) => result.rows[0]);

    if (permissions) {
      const userPermissionsMap = permissions?.map((p) => [user.id, p]);

      await client.query(
        "DELETE FROM employee_permission WHERE employee_id = $1",
        [id],
      );

      await client.query<string[]>(
        format(
          `
      INSERT INTO employee_permission (employee_id, permission_id) VALUES %L
    `,
          userPermissionsMap,
        ),
      );
    }

    let currentPermissions: string[] = [];
    if (!permissions) {
      currentPermissions = await getUserPermissions(id);
    }

    await client.query("COMMIT");

    return normalizeUser({
      ...user,
      permissions: permissions || currentPermissions,
    });
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};
