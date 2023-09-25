import { NextResponse } from "next/server";
import { pool } from "@/db/db";
import { Permission } from "@/domain/permissions/types";
import { catchErrors } from "@/errors/catch-errors";

export const getPermissionsController = catchErrors(async () => {
  const permissions = await pool
    .query<Permission[]>(
      `
          SELECT id, name FROM permission;
    `,
    )
    .then((result) => result.rows);

  return NextResponse.json(permissions);
});
