import { deleteUserController } from "@/domain/users/api/controllers/delete-user/delete-user.controller";
import { getUserController } from "@/domain/users/api/controllers/get-user/get-user.controller";

export const GET = getUserController;
export const DELETE = deleteUserController;
