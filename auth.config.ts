import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";
import Credentials from "@auth/core/providers/credentials";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.AUTH_GOOGLE_ID,
      clientSecret: import.meta.env.AUTH_GOOGLE_SECRET,
      async profile(profile) {
        return { ...profile }
      },
    }),
    Credentials({
      async authorize(credentials) {
        return { ...credentials }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      return token;
    },
    session({ session, token }) {
      return session;
    }
  }
})