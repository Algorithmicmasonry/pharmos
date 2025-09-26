export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};

export interface User {
  id: string;
  email: string;
  name?: string | null;
  role: string;
}

export type LoginProps = {
  email : string;
  password: string;
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Location {
  name: string;
  address: string;
}


export interface FormData {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
  locations: Location[];
}

export interface FormErrors {
  businessName?: string;
  businessType?: string;
  whatsappNumber?: string;
  locations?: {
    [index: number]: {
      name?: string;
      address?: string;
    };
  };
  [key: string]: any; // Allow for other potential error keys if needed
}
