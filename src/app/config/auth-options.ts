import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { authenticateUser } from "../server/login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } =
          (credentials as { email: string; password: string }) || {};
        if (!email || !password) {
          throw new Error("missing email or password");
        }
        try {
          const user = await authenticateUser(email, password);
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      return { ...session, user: token };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
