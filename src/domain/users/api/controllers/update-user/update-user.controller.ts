import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/domain/auth/utils/authorize";
import { updateUser } from "@/domain/users/api/controllers/update-user/update-user.service";
import { UpdateUserPayload } from "@/domain/users/schemas/user";
import {
  UpdateUserParamsType,
  UpdateUserPayloadType,
} from "@/domain/users/types";
import { catchConflict } from "@/errors/catch-conflict";
import { catchErrors } from "@/errors/catch-errors";
import { catchFKViolation } from "@/errors/catch-fk-violation";
import { badRequest } from "@/errors/errors";
import { TOKEN_COOKIE_NAME } from "@/utils/api/token-cookie";
import { validateRequest } from "@/utils/api/validate-request";

const guardPermissions = ["UM"];

export const updateUserController = catchErrors(
  async (req: NextRequest, { params }: { params: UpdateUserParamsType }) => {
    const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
    await authorize({ token, guardPermissions });

    const body: UpdateUserPayloadType = await req.json();
    if (Object.keys(body).length === 0) {
      throw badRequest();
    }
    validateRequest({ body: [body, UpdateUserPayload] });

    const updateUserWithCatchers = catchFKViolation(catchConflict(updateUser));
    const user = await updateUserWithCatchers(body, Number(params.id));
    return NextResponse.json(user);
  },
);
