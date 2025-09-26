"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const params = useSearchParams();
  const emailFromQuery = params.get("email") || "";
  const [email, setEmail] = useState(emailFromQuery);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    const { error } = await forgetPassword({
      email,
      redirectTo: `${window.location.origin}/login/forgot-account/forgot-password/reset-password`, // This page will be created next
    });

    if (error) {
      setMessage("Something went wrong. Please try again.");
    } else {
      setMessage("Check your email for the reset link.");
    }
    setIsLoading(false)
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto space-y-4 container"
    >
      <h1 className="text-xl font-bold">Forgot Password?</h1>
      <Input
        type="email"
        required
        value={email}
        placeholder="Your email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2"
      />
      <div className="grid grid-cols-3 gap-2">
        <Button type="submit" disabled={isLoading} aria-disabled={isLoading}>
          {isLoading ? "Loading...." : "Send Reset Link"}
        </Button>
        <Link href="/login">
          <Button
            variant={"outline"}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </Link>
      </div>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPasswordPage;
