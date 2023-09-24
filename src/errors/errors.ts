import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ApiError<T> extends Error {
  status: number;
  message: string;
  details: T;

  constructor(params: { status: number; message: string; details: T }) {
    super();
    this.status = params.status;
    this.message = params.message;
    this.details = params.details;
  }
}

const getAPiErrorCreator =
  (status: StatusCodes) =>
  <T = void>({
    message = getReasonPhrase(status),
    details = undefined as T,
  }: { message?: string; details?: T } = {}) => {
    return new ApiError<T>({ status, message, details });
  };

export const badRequest = getAPiErrorCreator(StatusCodes.BAD_REQUEST);
export const unauthorized = getAPiErrorCreator(StatusCodes.UNAUTHORIZED);
export const forbidden = getAPiErrorCreator(StatusCodes.FORBIDDEN);
export const notFound = getAPiErrorCreator(StatusCodes.NOT_FOUND);
export const conflict = getAPiErrorCreator(StatusCodes.CONFLICT);
export const serverError = getAPiErrorCreator(
  StatusCodes.INTERNAL_SERVER_ERROR,
);
