import { NextResponse } from "next/server";
import { createSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, company, password } = body;

  if (!email || !name) {
    return NextResponse.json({ error: "Email and name are required" }, { status: 400 });
  }

  const user = {
    id: "usr_" + Math.random().toString(36).slice(2, 8),
    email,
    name,
    company: company || "My Startup",
  };

  const response = NextResponse.json({ user, redirect: "/dashboard" });
  response.headers.set("Set-Cookie", createSessionCookie(user));
  return response;
}
