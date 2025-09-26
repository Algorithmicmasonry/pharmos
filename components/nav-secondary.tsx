"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";

export function NavSecondary() {
  return (
    <Card className="gap-2 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">E-commerce Website</CardTitle>
        <CardDescription>
          Check out your live e-commerce website here
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="grid gap-2.5">
          <Link href="/ecommerce-website" className="flex flex-col items-center justify-between">
            <Button
              className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
              size="sm"
            >
              Live Website
               <TrendingUp />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
