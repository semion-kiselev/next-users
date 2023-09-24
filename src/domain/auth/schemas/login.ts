import { z } from "zod";

export const LoginPayload = z.object({
  email: z.string().email({ message: "Please, enter correct email" }),
  password: z
    .string()
    .min(8, { message: "Password should be more or equal 8 symbols" })
    .max(255),
});

export type LoginPayloadType = z.infer<typeof LoginPayload>;
