import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const { data } = await res.json();
        if (res.ok && data) {
          return {
            token: data.token,
            email: data.email,
            id: data.id,
            password: data.password,
            name: data.nama,
            image: "https://api.dicebear.com/6.x/open-peeps/svg?seed=Felix",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // * First - When Sign in is Success
    async signIn() {
      return true;
    },
    // * Ketika terjadi redirect ketika sign out atau sign in
    async redirect({ baseUrl }: any) {
      return baseUrl;
    },
    // * Second - When JWT is created
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    // * Third - When Session is created
    async session({ session, token }: any) {
      session.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
