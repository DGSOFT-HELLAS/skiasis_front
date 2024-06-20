import NextAuth, { NextAuthOptions, User, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import translateData from 'src/utils/translateData';

declare module "next-auth" {
  
  interface Session {
    user: {
        id: string,
        name: string,
        role: string,
    } & DefaultSession["user"]
  }
}




interface UserResponse {
    NAME: string;
    WEBGROUPNAME: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/login',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
                const { password, email: username } = credentials;
                const clientID = await softoneLogin(password, username);
                if (!clientID) return null;
                const authID = await softoneAuthenticate(clientID);
                console.log({authID})
                if (!authID) return null;
                const user = await getUser(authID);
                if (!user) {
                    return null;
                }
                return {
                    id: authID,
                    name: user?.NAME,
                    role: user?.WEBGROUPNAME,
                } as User;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = (user as any).id;
                token.name = (user as any).name;
            }

            return token;
        },
        async session({ session, token }) {
          
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

async function softoneLogin(password: string, username: string): Promise<string | null> {
    try {
        const { data } = await axios.post(`${process.env.SOFT_URL}`, {
            SERVICE: "Login",
            USERNAME: username.trim(),
            PASSWORD: password.trim(),
            APPID: "1001",
        });
        return data.clientID;
    } catch (e) {
        return null;
    }
}

async function softoneAuthenticate(clientID: string): Promise<string | null> {
    try {
        const { data } = await axios.post(`${process.env.SOFT_URL}`, {
            service: "authenticate",
            clientID: clientID,
            COMPANY: "1001",
            BRANCH: "1000",
            MODULE: "0",
            REFID: "262",
        });

        return data.clientID;
    } catch (e) {
        return null;
    }
}

async function getUser(clientID: string): Promise<UserResponse | null> {
    try {
        const response = await fetch(`${process.env.SOFT_URL}/JS/Production/calls.getUser`, {
            method: 'POST',
            body: JSON.stringify({
                clientId: clientID,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
       
        const buffer = await translateData(response);
        console.log(buffer)
        return buffer[0] as UserResponse;
    } catch (e) {
        return null;
    }
}