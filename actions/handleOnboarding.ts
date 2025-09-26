"use server"

import { auth } from "@/config/auth";
import { db } from "@/prisma/db"; // Your centralized Prisma client instance from 'prisma/db.ts'
import { BusinessStatus, BusinessType, LocationType } from '@prisma/client';


interface LocationInput {
  name: string;
  address: string;
}

interface OnboardingFormData {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
  locations: LocationInput[];
}

/**

 * @param data - The onboarding form data containing business name, type, WhatsApp number, and locations.
 * @returns An object indicating success and the IDs of the created business and locations.
 * @throws {Error} If the user is unauthorized, required fields are missing, or an unexpected error occurs during database operations.
 */
export const handleOnboarding = async (data: OnboardingFormData) => {

  // Get the session and extract the user ID
    const session = await auth();
    
  const userId = session?.user?.id;

  // Ensure the user is authenticated before proceeding
  if (!userId) {
    throw new Error("Unauthorized: User not authenticated.");
  }

  // Destructure the input data for easier access
  const { businessName, businessType, whatsappNumber, locations } = data;

  // Server-side validation: Check for essential fields
  // This provides an extra layer of validation beyond the client-side form.
  if (!businessName.trim() || !whatsappNumber.trim() || !locations || locations.length === 0) {
    console.error("Required fields missing for onboarding:", { businessName, whatsappNumber, locations });
    throw new Error("All required fields (business name, WhatsApp number, and at least one location) must be provided for onboarding.");
  }

  // Validate the provided businessType against the Prisma `BusinessType` enum
  const validBusinessTypes = Object.values(BusinessType) as string[]; // Get string values of the enum
  const normalizedBusinessType = businessType.toUpperCase(); // Convert input to uppercase for matching
  if (!validBusinessTypes.includes(normalizedBusinessType)) {
    console.error("Invalid business type provided:", businessType);
    throw new Error(`Invalid business type provided: "${businessType}". Must be one of: ${validBusinessTypes.join(', ').toLowerCase()}.`);
  }

  try {
    const transactionResult = await db.$transaction(async (prisma) => {
      const business = await prisma.business.create({
        data: {
          name: businessName,
          type: normalizedBusinessType as BusinessType, // Cast string to Prisma enum type
          owner: {
            connect: { id: userId }, // Connect to the User model as the owner
          },
          users: {
            connect: { id: userId }, // Also link the owner to the business's list of users
          },
          status: BusinessStatus.ACTIVE, // Assuming active by default upon onboarding
        },
      });

      // 2. Create Location records associated with the new business.
      // - `Promise.all` is used to create all locations concurrently for efficiency.
      // - Each location is connected to the `business.id` using the `connect` operation.
      // - `locationType` is set to `RETAIL` as a sensible default for an onboarding process.
      const createdLocations = await Promise.all(
        locations.map((loc) =>
          prisma.location.create({
            data: {
              name: loc.name,
              address: loc.address,
              business: {
                connect: { id: business.id }, // Connect to the newly created business
              },
              locationType: LocationType.RETAIL, // Assuming a default location type
              isActive: true, // Assuming locations are active by default
            },
          })
        )
      );

      // Extract the IDs of the newly created locations.
      // These IDs are needed to update the user's accessible locations.
      const createdLocationIds = createdLocations.map(loc => loc.id);

      // 3. Update the User record with the new business and location information.
      // - `whatsappNumber` is updated from the form data.
      // - `onboarded` status is set to `true`.
      // - `currentBusiness` is set to the new business via `connect`.
      // - The new business is added to the user's list of `businesses` via `connect`.
      // - All newly created locations are added to the user's `accessibleLocations` via `connect`.
      await prisma.user.update({
        where: { id: userId }, // Target the current user
        data: {
          whatsappNumber: whatsappNumber,
          onboarded: true,
          currentBusiness: {
            connect: { id: business.id }, // Set the newly created business as the current business
          },
          businesses: {
            connect: { id: business.id }, // Add the new business to the user's list of businesses
          },
          accessibleLocations: {
            connect: createdLocationIds.map(id => ({ id })), // Add all new locations to the user's accessible locations
          },
        },
      });

      // Return a success object along with the IDs of the created records.
      return { success: true, businessId: business.id, locationIds: createdLocationIds };
    });

    return transactionResult; // Return the result of the transaction (success: true, IDs, etc.)

  } catch (error) {
    // Log the full error for server-side debugging
    console.error("Failed to onboard user with Prisma:", error);

    // Re-throw a more generalized error message suitable for client-side display (e.g., via toast).
    // This hides sensitive database error details from the client.
    throw new Error(`Failed to complete business setup. Please try again. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
};
