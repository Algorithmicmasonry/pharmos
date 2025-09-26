"use client";

import { handleOnboarding } from "@/actions/handleOnboarding"; // Assuming this is already TypeScript compliant or handles its own types
import { Button } from "@/components/ui/button";
import {
  Building2,
  Loader2,
  MapPin,
  Phone,
  Plus,
  Store,
  X
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Logo from "../global/logo";
import { FormData, Location , FormErrors} from "@/types/types";




const OnboardingForm: React.FC = () => {
  // Initialize formData with the defined interface
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    whatsappNumber: "",
    locations: [{ name: "", address: "" }],
  });

  // Initialize errors with the defined interface
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const businessTypes: { value: string; label: string }[] = [
    { value: "pharmacy", label: "Pharmacy" },
    { value: "supermarket", label: "Supermarket" },
    { value: "boutique", label: "Boutique" },
    { value: "electronics", label: "Electronics" },
    { value: "other", label: "Other" },
  ];

  // Type the event parameter for input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the specific field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Type the parameters for location change
  const handleLocationChange = (
    index: number,
    field: keyof Location, // 'name' or 'address'
    value: string
  ) => {
    const newLocations = [...formData.locations];
    newLocations[index] = { ...newLocations[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      locations: newLocations,
    }));
    // Clear location- specific error if it exists
    if (errors.locations?.[index]?.[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (newErrors.locations) {
          // Ensure the specific location error object exists before modifying
          newErrors.locations[index] = {
            ...(newErrors.locations[index] || {}), // Preserve other errors for this location
            [field]: undefined,
          };
        }
        return newErrors;
      });
    }
  };

  const addLocation = () => {
    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, { name: "", address: "" }],
    }));
  };

  const removeLocation = (index: number) => {
    if (formData.locations.length > 1) {
      setFormData((prev) => ({
        ...prev,
        locations: prev.locations.filter((_, i) => i !== index),
      }));
      // Also clear errors for the removed location
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (newErrors.locations) {
          const newLocationErrors = newErrors.locations ? [...Object.values(newErrors.locations)] : [];
          newLocationErrors.splice(index, 1);
          newErrors.locations = newLocationErrors;
        }
        return newErrors;
      });
    }
  };

  // Type the event parameter for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: FormErrors = {}; // Explicitly type newErrors
    let hasErrors = false;

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
      hasErrors = true;
    }

    // Validate locations array and individual location fields
    const locationErrors: { name?: string; address?: string }[] = formData.locations.map(
      (location) => {
        const locErrors: { name?: string; address?: string } = {};
        if (!location.name.trim()) {
          locErrors.name = "Location name is required";
          hasErrors = true;
        }
        if (!location.address.trim()) {
          locErrors.address = "Location address is required";
          hasErrors = true;
        }
        return locErrors;
      }
    );

    // Only set locationErrors if there are actual errors within them
    const hasLocationErrors = locationErrors.some(
      (locErr) => locErr.name || locErr.address
    );
    if (hasLocationErrors) {
      newErrors.locations = locationErrors as FormErrors['locations']; // Cast to ensure type compatibility
      hasErrors = true;
    }


    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false); // Stop loading if there are validation errors
      return;
    }

    try {
      // Assuming handleOnboarding expects FormData type
      await handleOnboarding(formData);
      router.push("/dashboard");
      toast.success("Onboarding Successful");
    } catch (error) {
      console.error("Failed to onboard User: ", error);
      toast.error("Failed to Onboard Business. Please try again."); // Using toast.error for consistency
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex flex-col items-center justify-center mb-6"> {/* Changed to flex-col for better stacking on small screens */}
            <Logo />
            <h1 className="text-3xl font-extrabold text-gray-900 mt-4"> {/* Added mt-4 for spacing */}
              Welcome to PharmOS
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Let&apos;s set up your pharmacy profile
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700"
              >
                Pharmacy Name <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Store className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  placeholder="e.g. Blessing Pharmacy"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-2 border ${errors.businessName ? "border-red-300" : "border-gray-300"} rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.businessName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.businessName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="businessType"
                className="block text-sm font-medium text-gray-700"
              >
                Business Type
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a business type</option>
                  {businessTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="whatsappNumber"
                className="block text-sm font-medium text-gray-700"
              >
                WhatsApp Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  placeholder="e.g. +1234567890"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                  Locations <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={addLocation}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-blue-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Location
                </button>
              </div>

              {formData.locations.map((location, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                  {formData.locations.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLocation(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      aria-label={`Remove location ${index + 1}`} // Added ARIA label
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Location Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Store className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. Main Branch"
                        value={location.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleLocationChange(index, "name", e.target.value)
                        }
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.locations?.[index]?.name ? "border-red-300" : "border-gray-300"} rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                    </div>
                    {errors.locations?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.locations[index]?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location Address <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute top-2 left-0 pl-3 pt-2 pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Enter location address"
                        value={location.address}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          handleLocationChange(index, "address", e.target.value)
                        }
                        className={`block w-full pl-10 pr-3 py-2 border ${errors.locations?.[index]?.address ? "border-red-300" : "border-gray-300"} rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                      />
                    </div>
                    {errors.locations?.[index]?.address && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.locations[index]?.address}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Completing Setup...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
