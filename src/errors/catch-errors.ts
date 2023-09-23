import { NextResponse } from "next/server";
import { ApiError, serverError } from "./errors";

export const catchErrors =
  <CallbackFunction extends (...args: any[]) => Promise<any>>(
    fn: CallbackFunction,
  ) =>
  (...args: Parameters<CallbackFunction>) =>
    fn(...args).catch((error: unknown) => {
      const err = error instanceof ApiError ? error : serverError();
      return NextResponse.json(err, { status: err.status });
    });
