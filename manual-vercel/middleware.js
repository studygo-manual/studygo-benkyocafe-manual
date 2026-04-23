export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    // 全てのパスを保護、以下は除外:
    // - /api/auth/* (NextAuth内部)
    // - /signin (ログイン画面)
    // - /denied (アクセス拒否画面)
    // - /_next/* (Next.js内部)
    // - favicon.ico
    "/((?!api/auth|signin|denied|_next/static|_next/image|favicon.ico).*)",
  ],
};
