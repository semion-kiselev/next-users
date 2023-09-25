import { pool } from "@/db/db";
import { UserWithPermissionsFromDb } from "@/domain/users/types";

export const getUser = async (id: number) =>
  pool
    .query<UserWithPermissionsFromDb>(
      `
      SELECT id, name, email, created_at, updated_at, json_agg(ep.permission_id) as permissions
      FROM employee
      JOIN employee_permission ep on employee.id = ep.employee_id
      WHERE id = $1
      GROUP BY id, name, email, created_at, updated_at;
    `,
      [id],
    )
    .then((result) => result.rows[0]);
