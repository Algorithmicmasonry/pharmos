"use server"

import { db } from "@/prisma/db"
import { UserProps } from "@/types/types"
import bcrypt from 'bcrypt'


/**
 * Checks if a user has completed the onboarding process.
 *
 * @param userId The ID of the user to check.
 * @returns A Promise that resolves to `true` if the user is onboarded, `false` otherwise.
 * @throws {Error} If the userId is invalid or a database error occurs.
 */
export const checkUserOnboardingStatus = async (userId: string): Promise<boolean> => {
  if (!userId) {
    throw new Error("User ID is required to check onboarding status.");
  }

  try {
    // Find the user by ID and select only the 'onboarded' field
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        onboarded: true, // Only fetch the 'onboarded' field
      },
    });

    // If user is found, return their 'onboarded' status.
    // If user is not found, or onboarded is null/undefined (though schema defaults to false), return false.
    return user?.onboarded === true;
  } catch (error) {
    console.error(`Error checking onboarding status for user ${userId}:`, error);
    throw new Error("Failed to retrieve user onboarding status due to a database error.");
  }
};


export const createUser = async (formData: UserProps) => {
  console.log("Calling create user function")
 const {email,name, firstName, lastName, password, image } = formData

 try {
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where: {
      email
    }
  })

  if(existingUser) {
    return {
      error: `Email already exists`,
      status: 409,
      data: null
    }
  }

  const newUser = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      firstName,
      lastName,
      image
    }
  })
 
  return {
    error: null,
    status: 200,
    data:newUser
  }

  
 } catch (error) {
    console.log(error);
    return {
  error: `Something went wrong. Please try again`,
  status: 500,
  data: null
};
}

}



export const searchAccount = async  (email: string) => {
  const user = await db.user.findUnique({
    where: {email}
  })

  return !!user;
}