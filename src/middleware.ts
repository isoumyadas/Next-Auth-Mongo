import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // what url path does user is at
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/signup", "/verifyemail", "/forgotpassword"];
  const isPublicPath = publicPaths.includes(path);

  const token = request.cookies.get("token")?.value || "";

  // If i'm at publicPath and have token. then i should not be at homepage or protected routes.

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If i'm not at publicPath and not have token too. then i should do login first

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If none of the above, allow the request to proceed
  // If your middleware function reaches a code path that doesn't return any NextResponse, the request will hang and eventually time out, showing an error to the user. Next.js requires every request to be resolved, so you must always return a response (e.g., via .next(), .redirect(), or .rewrite()).

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/verifyemail",
    "/forgotpassword",
  ],
};
