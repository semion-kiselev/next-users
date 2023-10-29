import { cookies } from "next/headers";

export const getCookiesString = () =>
  cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join(";");
