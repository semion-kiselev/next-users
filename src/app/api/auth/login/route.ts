import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/app/api/auth/login/service";
import { catchErrors } from "@/errors/catch-errors";
import { unauthorized } from "@/errors/errors";
import { LoginPayload, LoginPayloadType } from "@/schemas/login";
import { jwt } from "@/utils/jwt";
import { tokenCookie } from "@/utils/token-cookie";
import { validateRequest } from "@/utils/validate-request";

export const POST = catchErrors(async (req: NextRequest) => {
  const body: LoginPayloadType = await req.json();

  validateRequest({ body: [body, LoginPayload] });

  const userId = await getUserId(body);

  if (typeof userId !== "number") {
    throw unauthorized();
  }

  const token = await jwt.sign({ userId });

  return new NextResponse(null, {
    headers: tokenCookie.getHeader(token),
  });
});
