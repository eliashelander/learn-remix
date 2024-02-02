import { createCookieSessionStorage } from "@remix-run/node";

type SessionFlashData = {
  error: string;
  success: string;
  info: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionFlashData>({
    cookie: {
      name: "__session",
      domain: "localhost",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secrets: ["s3cret1"],
      secure: true,
    },
  });

export { getSession, commitSession, destroySession };
