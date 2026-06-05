// Next.js 16: "middleware" -> "proxy" konvensiyasi.
// next-intl middleware handler default export sifatida ishlatiladi.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Statik fayllar, _next va nuqtali fayllardan tashqari barcha yo'llar
  matcher: ["/", "/(uz|en|ru)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
