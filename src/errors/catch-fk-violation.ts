import { ReturnPromiseType } from "@/utils/types";
import { badRequest } from "./errors";

export const catchFKViolation =
  <Fn extends (...args: any[]) => Promise<ReturnPromiseType<Fn>>>(fn: Fn) =>
  (...args: Parameters<Fn>) =>
    fn(...args).catch((error: { code: string }) => {
      if (error.code === "23503") {
        throw badRequest();
      }
      throw error;
    });
