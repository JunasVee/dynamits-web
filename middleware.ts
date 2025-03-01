import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Dapatkan token dan role dari session
    const token = req.nextauth.token;
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Return true jika harus menjalankan middleware
      authorized: ({ token }) => !!token,
    },
  }
);

// Konfigurasi rute mana yang harus di-handle middleware
export const config = {
  matcher: ["/driver/:path*"],
};
