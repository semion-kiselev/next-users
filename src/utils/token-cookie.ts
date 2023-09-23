export const tokenCookie = {
  getHeader: (token: string, { unset = false }: { unset?: boolean } = {}) => ({
    "Set-Cookie": `token=${token}; Max-Age=${
      unset ? 0 : process.env.ACCESS_TOKEN_EXPIRATION_SECONDS
    }; SameSite=Strict; HttpOnly`,
  }),
};
