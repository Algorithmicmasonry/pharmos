"use client";

import { BarChart2, DollarSign, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "./section-header";

const features = [
  {
    icon: Users,
    tab: "Authentication",
    title: "Advanced Authentication",
    description:
      "Secure and flexible authentication system with role-based access control and multi-provider support.",
    href: "/features/authentication",
    subFeatures: [
      "NextAuth integration with GitHub, Google, and credentials",
      "Role-based access control for managing user permissions",
      "Session management with JWT and secure cookies",
      "Customizable login and registration flows",
      "Support for multiple roles and hierarchical permissions",
      "Secure password handling with encryption",
      "Social login for quick and easy access",
      "Token expiration and refresh mechanisms",
    ],
    image: "/images/auth.webp",
  },
  {
    icon: GraduationCap,
    tab: "Dashboard",
    title: "Dynamic Dashboard",
    description:
      "Beautifully designed, responsive dashboard with data visualization and management tools.",
    href: "/features/dashboard",
    subFeatures: [
      "Fully responsive and mobile-friendly interface",
      "Customizable widgets for key metrics",
      "Real-time data updates with server-side rendering",
      "User-friendly navigation and layout",
      "Integrated charts and data visualization tools",
      "Dark and light mode support",
      "Role-specific dashboard views",
      "Seamless integration with backend APIs",
    ],
    image: "/images/dash.webp",
  },
  {
    icon: DollarSign,
    tab: "Forms",
    title: "Reusable Form Components",
    description:
      "Streamline your workflows with reusable and customizable form components.",
    href: "/features/forms",
    subFeatures: [
      "Prebuilt form inputs with validation",
      "Support for text, numbers, dates, and dropdowns",
      "Integration with React Hook Form for effortless validation",
      "Customizable error handling and feedback",
      "Tooltips and inline helper text support",
      "Reusable form sections for consistent design",
      "Dynamic forms with conditional fields",
      "Optimized performance for large forms",
    ],
    image: "/images/dash-2.webp",
  },
  {
    icon: BarChart2,
    tab: "Data Tables",
    title: "Advanced Data Tables",
    description:
      "Manage and display data effortlessly with customizable and powerful data tables.",
    href: "/features/data-tables",
    subFeatures: [
      "Pagination, sorting, and filtering out-of-the-box",
      "Custom column rendering with advanced formatting",
      "Export data to CSV, Excel, or PDF formats",
      "Integrated search functionality",
      "Server-side data fetching and caching",
      "Dynamic row actions for CRUD operations",
      "Role-based data access and visibility",
      "Seamless integration with Prisma and backend APIs",
    ],
    image: "/images/dash.webp",
  },
];

export default function TabbedFeatures() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="py-8">
        <SectionHeader
          title="Core Features"
          heading="Your Complete Fullstack Starter Kit"
          description="Everything you need to kickstart your next fullstack project with modern tools and best practices."
        />
      </div>
      <Tabs defaultValue={features[0].tab.toLowerCase()} className="space-y-8">
        <TabsList className="inline-flex h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent p-0">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <TabsTrigger
                key={feature.tab}
                value={feature.tab.toLowerCase()}
                className="inline-flex items-center gap-2 border-b-2 border-transparent px-4 pb-4 pt-2 data-[state=active]:border-primary"
              >
                <Icon className="h-5 w-5" />
                {feature.tab}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {features.map((feature) => (
          <TabsContent
            key={feature.tab}
            value={feature.tab.toLowerCase()}
            className="space-y-8"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {feature.description}
                </p>
                <Card>
                  <CardContent className="grid gap-4 p-6">
                    {feature.subFeatures.map((subFeature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {index + 1}
                        </div>
                        <span>{subFeature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Button asChild>
                  <Link href={feature.href}>
                    Learn more about {feature.title}
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted lg:aspect-square">
                <Image
                  src={feature.image}
                  alt={`${feature.title} illustration`}
                  className="object-contain"
                  fill
                  priority
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
