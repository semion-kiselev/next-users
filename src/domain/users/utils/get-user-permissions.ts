import { pool } from "@/db/db";

export const getUserPermissions = async (id: number) =>
  pool
    .query<{ permissions: string[] }>(
      `
          SELECT array_agg(ep.permission_id) as permissions
          FROM employee
                   JOIN employee_permission ep on employee.id = ep.employee_id
          WHERE id = $1
      `,
      [id],
    )
    .then((result) => result.rows[0].permissions);
