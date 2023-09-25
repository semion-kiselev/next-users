import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/domain/auth/utils/authorize";
import { getUsers } from "@/domain/users/api/controllers/get-users/get-users.service";
import { normalizeUser } from "@/domain/users/utils/normalize-user";
import { catchErrors } from "@/errors/catch-errors";
import { TOKEN_COOKIE_NAME } from "@/utils/api/token-cookie";

const guardPermissions = ["UR"];

export const getUsersController = catchErrors(async (req: NextRequest) => {
  const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
  await authorize({ token, guardPermissions });

  const users = await getUsers();
  return NextResponse.json(users.map((user) => normalizeUser(user)));
});
