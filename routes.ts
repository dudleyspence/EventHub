/*
An array of routes accessible to the public that dont require auth
@type {string[]}
*/

export const publicRoutes = ["/", "/events", "/events/:id"];

/*
An array of routes used for authenticatio
@type {string[]}
*/

export const authRoutes = ["/signin", "/signup"];

/*
- The prefix for api authentication routes
- Routes that start with this are use for API auth purposes
@type {string}
*/

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_SIGNIN_REDIRECT = "/";
