import { pool } from "@/db/db";
import { LoginPayloadType } from "@/schemas/login";

export const getUserId = async ({ email, password }: LoginPayloadType) => {
  return pool
    .query<{ id: number | undefined }>(
      `
    SELECT id FROM employee WHERE email = $1 AND password = crypt($2, password);
  `,
      [email, password],
    )
    .then((result) => result.rows[0]?.id);
};
