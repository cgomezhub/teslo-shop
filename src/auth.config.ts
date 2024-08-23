import NextAuth, { type NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  // todo: segun Fernando se puede estudiar a fondo el token para...
  // todo... implementar un sistema de roles y permisos o bloquear usuarios
  
  callbacks: {

    // para el middleware de la pagina de checkout sin estar logueado
    authorized({ auth, request: { nextUrl } }) {
      // console.log({auth});
      const isLoggedIn = !!auth?.user;
      const isOnCheckout = nextUrl.pathname.startsWith('/checkout');
      if (isOnCheckout) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/checkout', nextUrl));
      // }
      return true;
    },

        
    jwt({ token, user }) {
      
      if (user) token = { ...token, ...user };
      
      // console.log({ jwt: { token} });
      return token;
    },
    session({ session, token, user }) {
      // console.log({ session: { token, user } });
      session.user = token as any; 

      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // console.log({authconfig:{ email, password }});
        // buscar email en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: email.toLocaleLowerCase() },
        });

        if (!user) return null;

        // comparar password

        if (!bcryptjs.compareSync(password, user.password)) return null;

        // retornar el usuario sin el password

        const { password: _, ...rest } = user;


        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
