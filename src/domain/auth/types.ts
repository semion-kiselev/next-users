import { z } from "zod";
import { LoginPayload } from "@/domain/auth/schemas/login";

export type LoginPayloadType = z.infer<typeof LoginPayload>;
