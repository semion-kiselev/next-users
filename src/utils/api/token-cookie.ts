export const TOKEN_COOKIE_NAME = "nu_token";

export const tokenCookie = {
  setHeader: (token: string, { unset = false }: { unset?: boolean } = {}) => ({
    "Set-Cookie": `${TOKEN_COOKIE_NAME}=${token}; Max-Age=${
      unset ? 0 : process.env.ACCESS_TOKEN_EXPIRATION_SECONDS
    }; SameSite=Strict; HttpOnly; Path=/;`,
  }),
};
