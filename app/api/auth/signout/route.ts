import { NextResponse } from "next/server";
import { deleteSessionCookie } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ redirect: "/" });
  response.headers.set("Set-Cookie", deleteSessionCookie());
  return response;
}
