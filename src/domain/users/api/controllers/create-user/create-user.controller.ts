import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/domain/auth/utils/authorize";
import { createUser } from "@/domain/users/api/controllers/create-user/create-user.service";
import {
  CreateUserPayload,
  CreateUserPayloadType,
} from "@/domain/users/schemas/user";
import { catchConflict } from "@/errors/catch-conflict";
import { catchErrors } from "@/errors/catch-errors";
import { catchFKViolation } from "@/errors/catch-fk-violation";
import { TOKEN_COOKIE_NAME } from "@/utils/api/token-cookie";
import { validateRequest } from "@/utils/api/validate-request";

const guardPermissions = ["UM"];

export const createUserController = catchErrors(async (req: NextRequest) => {
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
  await authorize({ token, guardPermissions });

  const body: CreateUserPayloadType = await req.json();
  validateRequest({ body: [body, CreateUserPayload] });

  const createUserWithCatchers = catchFKViolation(catchConflict(createUser));

  const user = await createUserWithCatchers(body);

  return NextResponse.json(user);
});
