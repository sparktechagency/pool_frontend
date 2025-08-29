// lib/auth.ts
import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      googleId?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleId?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "google" && user) {
        token.googleId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.googleId) {
        session.user.googleId = token.googleId;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/migrate`;
    },
  },
};
