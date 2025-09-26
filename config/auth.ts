import NextAuth, { NextAuthConfig } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/zod";
import {  verifyPassword } from "@/utils/password";
import { db } from "@/prisma/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          
          const user = await db.user.findUnique({
            where: {email}
          });
          if (!user) {
            throw new Error("Invalid credentials.");
          };

          let isValid;

         if (user && user.password) {
           isValid =   await verifyPassword(password,user.password);
         }  

         if (!isValid) return null;

         return {
        id: user.id, 
        email: user.email,
        name: user.name,
        role: user.role,
        };
        
        } catch (error) {
          if (error instanceof ZodError) {
            return null; // ❌ input validation failed
          }
          return null; // ❌ general error
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // ✅ You can extend the Session type globally if needed
      if (token.sub && token.role) {
        (session.user as any).id = token.sub;
        (session.user as any).role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      // ✅ Check that user is defined before assigning role
      if (user && "role" in user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
} satisfies NextAuthConfig);
