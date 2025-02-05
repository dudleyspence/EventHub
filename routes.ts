/**
 * The unprotected routes
 * @type {regex[]}
 */
export const publicRoutes = [/^\/$/, /^\/events$/, /^\/events.*$/];

const privateRoutes = [/^\/dashboard$/];

/**
 * The prefix for all admin pages
 * @type {string}
 */
export const adminRoutePrefix = "/admin";

/**
 * The landing page for admin users
 * @type {string}
 */
export const adminLandingPage = "/admin/events";

/**
 * Routes that only exist for admin
 * @type {regex[]}
 */
export const adminOnlyRoutes = [/^\/admin.*$/];

/**
 * Routes that normal users have and there is an admin version
 * @type {regex}[]
 */
export const adminVersionRoutes = [...privateRoutes, ...publicRoutes];

/**
 * Routes for auth pages
 * @type {string}[]
 */
export const authRoutes = ["/signin", "/signup", "/error"];

/**
 * The prefix for api authentication routes
 * Routes that start with this are use for API auth purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect when user is signed in
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/";
