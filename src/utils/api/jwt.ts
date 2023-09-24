import { sign, verify } from "jsonwebtoken";

const tokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const tokenExpiration = `${process.env.ACCESS_TOKEN_EXPIRATION_SECONDS}s`;

export const jwt = {
  sign: async <T extends object>(payload: T) =>
    new Promise<string>((resolve, reject) =>
      sign(
        payload,
        tokenSecret,
        { expiresIn: tokenExpiration },
        (err, token) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(token as string);
        },
      ),
    ),
  verify: async <T extends object>(token: string) =>
    new Promise<T>((resolve, reject) =>
      verify(token, tokenSecret, (err, decoded) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decoded as T);
      }),
    ),
};
