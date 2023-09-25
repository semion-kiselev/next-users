import { pool } from "@/db/db";
import { UserWithPermissionsFromDb } from "@/domain/users/types";

export const getUsers = async () =>
  pool
    .query<UserWithPermissionsFromDb>(
      `
          SELECT id, name, email, created_at, updated_at, json_agg(ep.permission_id) as permissions
          FROM employee
                   JOIN employee_permission ep on employee.id = ep.employee_id
          GROUP BY id, name, email, created_at, updated_at;
    `,
    )
    .then((result) => result.rows);
