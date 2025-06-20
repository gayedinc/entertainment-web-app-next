import { updateSession } from "./supabase/middleware";


export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|img/movie-login-icon.svg|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};