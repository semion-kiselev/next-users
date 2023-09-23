import { NextRequest, NextResponse } from "next/server";
import { forbidden, unauthorized } from "../errors/errors";

type Params = {
  req: NextRequest;
  res: NextResponse;
};

export const authorize = ({ req, res }: Params) => {
  // get access token from cookie
  // if no any token -> unauthorized()
  // check if tokens valid
  // if not valid -> unauthorized()
  // get userId, get permissions from db & compare w/ api guard
  // if not enough permissions -> forbidden()
};
