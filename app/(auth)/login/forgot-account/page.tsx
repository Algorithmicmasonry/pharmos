"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchAccount } from "@/actions/user";
import { Loader2 } from "lucide-react";

export default function ForgotAccountPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const found = await searchAccount(email);
    if (found) {
      router.push(
        `/login/forgot-account/forgot-password?email=${encodeURIComponent(
          email
        )}`
      );
    } else {
      router.push("/register");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-semibold">Find Your Account</h1>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Loader2 className="animate-spin" /> : "Search"}
      </Button>
    </form>
  );
}
