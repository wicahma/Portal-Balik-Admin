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
        const res = await fetch("http://localhost:4000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const user = await res.json();
        // console.log("user");
        if (res.ok && user) {
          console.log("OQE 👍🏼");
          console.log(user);
          return {
            token: user.token,
            email: user.email,
            id: user.id,
            password: user.password,
            name: user.name,
            image: "https://api.dicebear.com/6.x/open-peeps/svg?seed=Felix",
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    // * First - When Sign in is Success
    async signIn({ user, account, credentials }: any) {
      //   console.log("\nsignIn selector");
      //   console.log(user);
      //   console.log(account);
      //   console.log(credentials);
      return true;
    },
    // * Ketika terjadi redirect ketika sign out atau sign in
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    // * Second - When JWT is created
    async jwt({ token, user, account }: any) {
      //   console.log("\njwt selector");
      //   console.log(user);
      //   console.log(account);
      //   console.log(token);
      return { ...token, ...user };
    },
    // * Third - When Session is created
    async session({ session, token }: any) {
      //   console.log("\nsession selector");
      //   console.log(session);
      //   console.log(token);
      session.token = token.token;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
