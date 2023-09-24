import { ReturnPromiseType } from "@/utils/types";
import { conflict } from "./errors";

export const catchConflict =
  <Fn extends (...args: any[]) => Promise<ReturnPromiseType<Fn>>>(fn: Fn) =>
  (...args: Parameters<Fn>) =>
    fn(...args).catch((error: { code: string }) => {
      if (error.code === "23505") {
        throw conflict();
      }
      throw error;
    });
