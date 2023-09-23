import { NextRequest, NextResponse } from "next/server";
import { badRequest, forbidden, unauthorized } from "../errors/errors";

type Params = {
  req: NextRequest;
  res: NextResponse;
};

export const logout = ({ req, res }: Params) => {
  // get access token from cookie
  // if no any token -> unauthorized()
  // check if tokens valid
  // if not valid -> unauthorized()
  // remove token cookie
};
