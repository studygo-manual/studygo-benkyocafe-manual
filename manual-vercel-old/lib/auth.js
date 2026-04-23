import GoogleProvider from "next-auth/providers/google";

const ALLOWED_EMAILS = (process.env.ALLOWED_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return ALLOWED_EMAILS.includes(user.email.toLowerCase());
    },
  },
  pages: {
    signIn: "/signin",
    error: "/denied",
  },
};
