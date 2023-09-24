import { NextRequest, NextResponse } from "next/server";
import { authorize } from "@/domain/auth/utils/authorize";
import { deleteUser } from "@/domain/users/api/controllers/delete-user/delete-user.service";
import {
  DeleteUserParams,
  DeleteUserParamsType,
} from "@/domain/users/schemas/user";
import { catchErrors } from "@/errors/catch-errors";
import { notFound } from "@/errors/errors";
import { TOKEN_COOKIE_NAME } from "@/utils/api/token-cookie";
import { validateRequest } from "@/utils/api/validate-request";

const guardPermissions = ["UM"];

export const deleteUserController = catchErrors(
  async (req: NextRequest, { params }: { params: DeleteUserParamsType }) => {
    const token = req.cookies.get(TOKEN_COOKIE_NAME)?.value;
    await authorize({ token, guardPermissions });

    validateRequest({ pathParams: [params, DeleteUserParams] });

    const result = await deleteUser(Number(params.id));

    if (result.rowCount === 0) {
      throw notFound();
    }

    return NextResponse.json(null);
  },
);
