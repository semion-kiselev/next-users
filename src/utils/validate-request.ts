import { ZodError, ZodIssue, ZodObject } from "zod";
import { badRequest } from "@/errors/errors";

type Params = {
  headers?: [Record<string, unknown>, ZodObject<any>];
  queryParams?: [Record<string, unknown>, ZodObject<any>];
  pathParams?: [Record<string, unknown>, ZodObject<any>];
  body?: [Record<string, unknown>, ZodObject<any>];
};

export const validateRequest = (params: Params) => {
  const errors: Record<string, Pick<ZodIssue, "path" | "message">[]> = {};

  Object.entries(params).forEach(([place, [data, schema]]) => {
    try {
      schema.parse(data);
    } catch (e) {
      const error = e as ZodError;
      errors[place] = error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));
    }
  });

  if (Object.keys(errors).length !== 0) {
    throw badRequest({ details: errors });
  }
};
