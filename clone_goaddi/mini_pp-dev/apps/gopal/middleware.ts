import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("Userid");

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });
  // console.log("response", session);

  const url = new URL(request.url);

  const loginRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/new-password",
    "/auth/reset-otp",
  ];

  const gopalRoutes = ["/gopal", "/auth/sign-up"];

  const isLoginRoute = loginRoutes.includes(url.pathname);

  // Return to /login if don't have a session and not already on /auth/login
  // if (!session?.value && !isLoginRoute) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  // }

  if (session?.value && isLoginRoute) {
    return NextResponse.redirect(new URL("/gopal", request.url));
  }

  if (!session?.value && url.pathname.startsWith("/gopal")) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // if (responseAPI.status !== 200 && !isLoginRoute) {
  //   return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  // }

  if (responseAPI.status == 200 && isLoginRoute) {
    return NextResponse.redirect(new URL("/gopal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gopal",
    "/gopal/:path*",
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/new-password",
    "/auth/reset-otp",
  ],
};
