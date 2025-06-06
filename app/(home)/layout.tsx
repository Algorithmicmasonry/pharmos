import PromoBanner from "@/components/frontend/PromoBanner";
import Footer from "@/components/frontend/site-footer";
import SiteHeader from "@/components/frontend/site-header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import type { Metadata } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_URL ??
  "http://localhost:3000";

export const metadata: Metadata = {
  title: "PharmOS – Smart Pharmacy Operating System",
  description:
    "PharmOS helps Nigerian pharmacies manage inventory, sales, employees, and more — all from a single dashboard.",
  metadataBase: new URL(`https://${baseUrl}`),

  openGraph: {
    title: "PharmOS – Smart Pharmacy Software",
    description:
      "Manage pharmacy inventory, sales, staff, and reports with one powerful tool. Start with a 60-day free trial.",
    url: `https://${baseUrl}`,
    siteName: "PharmOS",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/pharmos-preview.webp",
        width: 1200,
        height: 630,
        alt: "PharmOS dashboard preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PharmOS – Pharmacy Operating System",
    description:
      "Modern POS, inventory tracking, and stock alerts for growing pharmacies in Nigeria.",
    creator: "@pharmosng", // Replace when you have a Twitter
    images: [`https://${baseUrl}/pharmos-preview.webp`],
  },
};


export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white">
      <PromoBanner />
      <SiteHeader session={session} />
      {children}
      <Footer />
    </div>
  );
}
