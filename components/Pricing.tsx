"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    // {
    //   name: "Starter",
    //   subtitle: "Free",
    //   monthlyPrice: 0,
    //   yearlyPrice: 0,
    //   idealFor: "Micro-pharmacies, trial users",
    //   features: [
    //     "60-day trial with access to all features",
    //     "Basic inventory management",
    //     "Sales tracking",
    //     "Customer management",
    //     "Basic reporting",
    //   ],
    //   recommended: false,
    //   badge: "Free Trial",
    // },
    {
      name: "Basic",
      monthlyPrice: 15000,
      yearlyPrice: 150000,
      idealFor: "Small pharmacies (1 branch)",
      features: [
        "Up to 500 products",
        "Up to 3 staff members",
        "Inventory management",
        "Sales & purchase tracking",
        "Customer management",
        "Basic reports",
        "Email support",
      ],
      recommended: false,
    },
    {
      name: "Pro",
      monthlyPrice: 25000,
      yearlyPrice: 250000,
      idealFor: "Medium pharmacies (1 location, more staff & products)",
      features: [
        "Up to 2,000 products",
        "Up to 10 staff members",
        "Advanced inventory management",
        "Prescription management",
        "Advanced reporting & analytics",
        "Barcode scanning",
        "Priority email support",
      ],
      recommended: true,
      badge: "Most Popular",
    },
    {
      name: "Business",
      monthlyPrice: 35000,
      yearlyPrice: 350000,
      idealFor: "Multi-location pharmacies (up to 3 branches)",
      features: [
        "Up to 5,000 products",
        "Up to 30 staff members",
        "Multi-branch management",
        "Advanced prescription tracking",
        "Custom reports & dashboards",
        "API integrations",
        "Phone & email support",
      ],
      recommended: false,
    },
    {
      name: "Enterprise",
      subtitle: "Custom",
      monthlyPrice: null,
      yearlyPrice: null,
      idealFor: "Pharmacies with 4+ branches",
      features: [
        "Unlimited products & staff",
        "Unlimited branches",
        "Custom integrations",
        "Advanced security features",
        "Dedicated account manager",
        "24/7 priority support",
        "Custom training & onboarding",
      ],
      recommended: false,
      badge: "Custom Pricing",
    },
  ];

  const formatPrice = (price: number | null) => {
    if (price === null) return "Custom";
    if (price === 0) return "Free";
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
        <p className="text-muted-foreground mb-8">
          Select the perfect plan for your pharmacy management needs
        </p>

        {/* Pricing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className={cn("text-sm", !isYearly && "font-semibold")}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              isYearly ? "bg-primary" : "bg-gray-200"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                isYearly ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
          <span className={cn("text-sm", isYearly && "font-semibold")}>
            Yearly
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, i) => {
          const isRecommended = plan.recommended;
          const currentPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={i}
              className={cn(
                "border rounded-lg p-8 relative min-h-[500px] flex flex-col",
                isRecommended && "border-primary shadow-lg scale-105"
              )}
            >
              {plan.badge && (
                <Badge
                  variant={isRecommended ? "default" : "secondary"}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  {plan.badge}
                </Badge>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                {plan.subtitle && (
                  <p className="text-sm text-muted-foreground mb-2">
                    ({plan.subtitle})
                  </p>
                )}
                <div className="mb-2">
                  <span className="text-3xl font-bold">
                    {formatPrice(currentPrice)}
                  </span>
                  {currentPrice !== null && currentPrice > 0 && (
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? "year" : "month"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{plan.idealFor}</p>
              </div>

              <div className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/register"}
              >
                <Button
                  className="w-full"
                  variant={isRecommended ? "default" : "outline"}
                >
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </Link>

              {plan.name !== "Enterprise" && plan.name !== "Starter" && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  {isYearly ? "Billed annually" : "Billed monthly"}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          All plans include a 60-day free trial, free setup and migration
          assistance and training for staff
          <br />
          Need a custom solution?{" "}
          <Link href="/contact">
            <button className="text-primary underline">
              Contact our sales team
            </button>
          </Link>
        </p>
      </div>
    </div>
  );
}
