import { pool } from "@/db/db";

export const deleteUser = async (id: number) =>
  pool.query(
    `
      DELETE FROM employee WHERE id = $1;
    `,
    [id],
  );
