import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/db/db";
import { catchErrors } from "@/errors/catch-errors";
import { unauthorized } from "@/errors/errors";
import { jwt } from "@/utils/api/jwt";
import { TOKEN_COOKIE_NAME, tokenCookie } from "@/utils/api/token-cookie";

export const logoutController = catchErrors(async (req: NextRequest) => {
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    throw unauthorized();
  }

  const { userId } = await jwt.verify<{ userId: number }>(token).catch(() => {
    throw unauthorized();
  });

  await pool.query(
    "UPDATE employee SET token_expired_at=now()::timestamptz WHERE id = $1",
    [userId],
  );

  return new NextResponse(null, {
    headers: tokenCookie.getHeader(token, { unset: true }),
  });
});
