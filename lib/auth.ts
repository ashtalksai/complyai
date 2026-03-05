import { cookies } from "next/headers";

const SESSION_COOKIE = "complyai-session";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  company: string;
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  if (!session?.value) return null;
  try {
    return JSON.parse(session.value) as SessionUser;
  } catch {
    return null;
  }
}

export function createSessionCookie(user: SessionUser): string {
  return `${SESSION_COOKIE}=${encodeURIComponent(JSON.stringify(user))}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;
}

export function deleteSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
