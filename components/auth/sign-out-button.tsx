"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutButton = () => {
  const router = useRouter();

 
  return (
    <div
      onClick={ () => signOut()}
      className="flex items-center justify-between w-18 cursor-pointer"
    >
      <LogOut />
      Log Out
    </div>
  );
};

export default SignOutButton;
