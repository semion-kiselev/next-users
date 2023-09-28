import { deleteUserController } from "@/domain/users/api/controllers/delete-user/delete-user.controller";
import { getUserController } from "@/domain/users/api/controllers/get-user/get-user.controller";
import { updateUserController } from "@/domain/users/api/controllers/update-user/update-user.controller";

export const GET = getUserController;
export const PUT = updateUserController;
export const DELETE = deleteUserController;
