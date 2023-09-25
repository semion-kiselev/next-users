import { createUserController } from "@/domain/users/api/controllers/create-user/create-user.controller";
import { getUsersController } from "@/domain/users/api/controllers/get-users/get-users.controller";

export const GET = getUsersController;
export const POST = createUserController;
