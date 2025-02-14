import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_SIGNIN_REDIRECT,
  publicRoutes,
  authRoutes,
  adminLandingPage,
} from "@/routes";
import { currentRole } from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const userRole = await currentRole();
  const pathway = nextUrl.pathname + nextUrl.search;
  console.log(pathway);

  // USER CHECKS:
  const isLoggedIn = !!req.auth;
  const userIsAdmin = userRole === "ADMIN";

  // ROUTE STATUS CHECKS:
  const isAPIAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = authRoutes.includes(pathway);
  const isPublicRoute = publicRoutes.some((routeRegex) => {
    return routeRegex.test(pathway);
  });
  const isAdminRoute = pathway.startsWith("/admin");

  // ROUTE REDIRECTS:
  if (isAPIAuthRoute) {
    return undefined;
  }

  // When user is logged out they can only access public routes and auth routes
  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    return Response.redirect(new URL("/signin", nextUrl));
  }

  // the user must be signed out to access the login page
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (userIsAdmin && pathway === "/") {
    // admin doesnt need the landing page - redirects to events
    return Response.redirect(new URL(adminLandingPage, nextUrl));
  }

  // protects admin routes that dont exist for non-admins
  if (isAdminRoute && !userIsAdmin) {
    return Response.redirect(new URL("/unauthorised", nextUrl));
  }

  // if user is admin but going to a non-admin route, redirect to the admin version of the page
  if (userIsAdmin && isPublicRoute) {
    // IMPORTANT: nextUrl.pathname doesnt include the queries
    return Response.redirect(new URL("/admin" + pathway, nextUrl));
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
