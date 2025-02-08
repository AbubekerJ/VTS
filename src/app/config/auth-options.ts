import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL
const DEC_KEY: string | undefined = process.env.NEXT_PUBLIC_PAYLOAD_KEY || ""

interface User {
    id: string;
    employeeId: string;
    fullName: string;
    accessToken: string;
    role: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string; } || {}
                if (!email || !password) {
                    throw new Error("missing email or password");
                }
                try {
                    // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
                    const { data } = await axios.post<{ user: User }>(`${API_URL}/auth/login`, { email, password})
                     
                    if (data.user) {
                        return data.user; // NextAuth will store this in the JWT
                    }
                    return null;

             

                } catch (error) {
                    const err = error as AxiosError
                    return null
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
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
        }
    },
};