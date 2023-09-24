import { NextRequest, NextResponse } from "next/server";
import { catchErrors } from "@/errors/catch-errors";
import { unauthorized } from "@/errors/errors";
import { jwt } from "@/utils/api/jwt";
import { TOKEN_COOKIE_NAME, tokenCookie } from "@/utils/api/token-cookie";

export const logoutController = catchErrors(async (req: NextRequest) => {
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;

  if (!token) {
    throw unauthorized();
  }

  await jwt.verify(token).catch(() => {
    throw unauthorized();
  });

  // todo: set token_expired_at to now()

  return new NextResponse(null, {
    headers: tokenCookie.getHeader(token, { unset: true }),
  });
});
