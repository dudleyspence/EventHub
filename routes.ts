/**
 * The unprotected routes
 * @type {regex[]}
 */
export const publicRoutes = [
  /^\/$/,
  /^\/events\/category\/.*$/,
  /^\/events\/.*$/,
];

/**
 * The landing page for admin users
 * @type {string}
 */
export const adminLandingPage = "/admin/events/category/all";

/**
 * Routes for auth pages
 * @type {string}[]
 */
export const authRoutes = ["/signin", "/signup", "/error"];

/**
 * The default redirect when user is signed in
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/";
