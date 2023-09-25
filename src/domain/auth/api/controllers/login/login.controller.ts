import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/domain/auth/api/controllers/login/login.service";
import { LoginPayload } from "@/domain/auth/schemas/login";
import { LoginPayloadType } from "@/domain/auth/types";
import { catchErrors } from "@/errors/catch-errors";
import { unauthorized } from "@/errors/errors";
import { jwt } from "@/utils/api/jwt";
import { tokenCookie } from "@/utils/api/token-cookie";
import { validateRequest } from "@/utils/api/validate-request";

export const loginController = catchErrors(async (req: NextRequest) => {
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
