import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req: NextRequest) {
  if (req.cookies["poll-token"]) return;

  const random = nanoid();

  // Redirect (to apply cookie)
  const res = NextResponse.redirect(req.nextUrl);

  res.cookie("poll-token", random, { sameSite: "strict" });

  return res;
}
