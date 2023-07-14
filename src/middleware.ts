// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function Middleware(req: NextRequestWithAuth) {
    console.log("middleware", req);
    if (
      req.nextUrl.pathname.startsWith("/extra") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/client") &&
      req.nextauth.token?.role !== "admin" &&
      req.nextauth.token?.role !== "manager"
    ) {
      return NextResponse.rewrite(new URL("/denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/extra", "/client", "/dashboard"] };
