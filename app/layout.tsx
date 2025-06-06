import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ourFileRouter } from "./api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import { PHProvider } from "@/components/posthog-provider";
import { Suspense } from "react";
import SimpleFallback from "@/components/SimpleFallback";

const inter = Rethink_Sans({ subsets: ["latin"], display: "swap" });

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

const PostHogPageView = dynamic(() => import("@/components/PostHogPageView"));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Suspense fallback={<SimpleFallback />}>
          <PHProvider>
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Providers>
                <Toaster position="top-center" reverseOrder={false} />
                <PostHogPageView />
                {children}
                <Analytics />
              </Providers>
            </ThemeProvider>
          </PHProvider>
        </Suspense>
      </body>
    </html>
  );
}
