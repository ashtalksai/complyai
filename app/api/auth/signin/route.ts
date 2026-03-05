import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Mock auth — accepts any email/password for MVP demo
  const user = {
    id: "usr_1",
    email: email,
    name: email.split("@")[0],
    company: "Demo Startup",
  };

  const response = NextResponse.json({ user, redirect: "/dashboard" });
  response.headers.set("Set-Cookie", createSessionCookie(user));
  return response;
}
