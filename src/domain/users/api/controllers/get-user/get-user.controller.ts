import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/domain/auth/utils/authorize";
import { getUser } from "@/domain/users/api/controllers/get-user/get-user.service";
import { GetUserParams } from "@/domain/users/schemas/user";
import { GetUserParamsType } from "@/domain/users/types";
import { normalizeUser } from "@/domain/users/utils/normalize-user";
import { catchErrors } from "@/errors/catch-errors";
import { notFound } from "@/errors/errors";
import { TOKEN_COOKIE_NAME } from "@/utils/api/token-cookie";
import { validateRequest } from "@/utils/api/validate-request";

const guardPermissions = ["UR"];

export const getUserController = catchErrors(
  async (req: NextRequest, { params }: { params: GetUserParamsType }) => {
    const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
    await authorize({ token, guardPermissions });

    validateRequest({ pathParams: [params, GetUserParams] });

    const id = Number(params.id);
    const user = await getUser(id);

    if (!user) {
      throw notFound();
    }

    return NextResponse.json(normalizeUser(user));
  },
);
