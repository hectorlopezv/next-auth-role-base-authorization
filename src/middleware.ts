
// Without a defined matcher, this one line applies next-auth
// to the entire project
// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware";
import type { NextRequestWithAuth } from "next-auth/middleware";
export default withAuth(
  function Middleware(req: NextRequestWithAuth) {
    console.log("middleware", req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);
// // Applies next-auth only to matching routes - can be regex
// // Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = { matcher: ["/extra", "/dashboard"] };
