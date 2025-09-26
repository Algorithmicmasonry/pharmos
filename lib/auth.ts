import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";
 
const prisma = new PrismaClient();
 
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  user: {
    // Remove the fields configuration entirely
    additionalFields: {
      firstName: {
        type: "string",
        required: true
      },
      lastName: {
        type: "string", 
        required: true
      }
    }
  },
  advanced: {
    database: {
      generateId: false, 
    },
  },
  emailAndPassword: {  
    enabled: true,
    autoSignIn: false,
    account: {
      accountLinking: {
        enabled: true,
      }
    },
    sendResetPassword : async ({user, url}) => {
      await sendEmail({
        to:user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`
      })
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  socialProviders: { 
    // github: { 
    //   clientId: process.env.GITHUB_CLIENT_ID as string, 
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    // }, 
    google: {
      prompt: "select_account", 
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        };
      },
    },
  }, 
  plugins: [nextCookies()]
});