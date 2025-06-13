"use server"

import { auth } from "@/lib/auth"
import { db } from "@/prisma/db"
import { LoginProps, UserProps } from "@/types/types"
import { APIError } from "better-auth/api"
import { redirect } from "next/navigation"

export const createUser = async (formData: UserProps) => {
  console.log("Calling create user function")
 const {email,name, firstName, lastName, password, image } = formData

 try {
 const newUser =  await auth.api.signUpEmail({
    body : {
      name,
      email,
      lastName,
      firstName,
      password,
      image,
    }
  })

  console.log("This is the object returned from better auth: ", newUser)

  return {
    errorMessage: null,
    status: 200,
    data: newUser.user,
  }
 } catch (error) {
 if (error instanceof APIError) {
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { 
            errorMessage: "User already exists.",
             status: 500, 
             data: null};
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." ,
            status: 500,
            data: null
          };
        default:
          return { errorMessage: "Something went wrong.",
            status: 500,
            data: null
           };
      }
    }
    console.error("sign up with email and password has not worked", error);
 }
  redirect('/dashboard')
}

export const signIn = async (formData: LoginProps) => {
  
 const {email, password } = formData

 try {
      const signedInUser =  await auth.api.signInEmail({
      body: {
        email,
        password
      },
    });

  console.log("This is the object returned from better auth: ", signedInUser)

  return {
    errorMessage: null,
    status: 200,
    data: signedInUser,
  }
 } catch (error) {
 if (error instanceof APIError) {
      switch (error.status) {
        case "UNAUTHORIZED":
          return { errorMessage: "User Not Found." };
        case "BAD_REQUEST":
          return { errorMessage: "Invalid email." };
        default:
          return { errorMessage: "Something went wrong." };
      }
    }
    console.error("sign up with email and password has not worked", error);
 }
  redirect('/dashboard')
}

export const searchAccount = async  (email: string) => {
  const user = await db.user.findUnique({
    where: {email}
  })

  return !!user;
}