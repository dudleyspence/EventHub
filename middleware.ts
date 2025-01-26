import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_SIGNIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  adminRoutePrefix,
  adminLandingPage,
  adminOnlyRoutes,
  adminVersionRoutes,
} from "@/routes";
import { currentRole } from "./lib/auth";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const userRole = await currentRole();
  const pathway = nextUrl.pathname;

  // USER CHECKS:
  const isLoggedIn = !!req.auth;
  const userIsAdmin = userRole === "ADMIN";

  // ROUTE STATUS CHECKS:
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(pathway);
  const isPublicRoute = publicRoutes.some((routeRegex) => {
    return routeRegex.test(pathway);
  });
  const isAdminVersionRoute = adminVersionRoutes.some((routeRegex) => {
    return routeRegex.test(pathway);
  });

  const isAdminOnlyRoute = adminOnlyRoutes.some((routeRegex) => {
    return routeRegex.test(pathway);
  });

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

  // admin doesnt need the landing page - redirects to events
  if (userIsAdmin && pathway === "/") {
    return Response.redirect(new URL(adminLandingPage, nextUrl));
  }

  // protects admin routes that dont exist for non-admins
  if (isAdminOnlyRoute && !userIsAdmin) {
    return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }

  // if user is admin but going to a non-admin route, redirect to the admin version of the page
  if (userIsAdmin && isAdminVersionRoute) {
    return Response.redirect(
      new URL(adminRoutePrefix + nextUrl.pathname, nextUrl)
    );
  }

  return undefined;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
