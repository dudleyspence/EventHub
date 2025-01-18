import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_SIGNIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  adminRoutePrefix,
  adminRoutes,
} from "@/routes";
import { currentRole } from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = await currentRole();
  console.log(userRole);
  const userIsAdmin = userRole === "ADMIN";

  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute) {
    return undefined;
  }

  // protects admin routes from non-admins
  if (isAdminRoute && !userIsAdmin) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }

  // admin doesnt need the landing page - redirects to events
  if (userIsAdmin && nextUrl.pathname === "/") {
    return Response.redirect(new URL("/admin/events", nextUrl));
  }

  // if user is admin but going to a non-admin route, redirect to the admin version of the page
  if (userIsAdmin && isAdminRoute) {
    return Response.redirect(new URL("/admin" + nextUrl.pathname, nextUrl));
  }

  if (isAuthRoute) {
    // if user is logged in direct them to landing page
    // if not logged in then allow them to signin page
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  // if user isnt logged in then protects all non public routes and sends user to signin
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
