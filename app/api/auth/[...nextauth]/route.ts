
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { FailedLoginResponse, SuccessLoginResponse } from "@/app/interfaces";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const payload: SuccessLoginResponse | FailedLoginResponse =
          await response.json();

        if ("token" in payload) {
          return {
            id: payload.user._id,
            user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message);
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user as any;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
