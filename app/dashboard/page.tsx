import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import Link from "next/link";
import { checkUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { auth } from "@/config/auth";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    return (
      <div>
        Not authenticated,{" "}
        <Link href="/register" className="underline">
          Go here to Register{" "}
        </Link>
      </div>
    );
  }

  // Now TypeScript knows session and session.user exist
  const user = session.user;
  console.log("This is the user in the user session: ", user);

  // Transform the user to match expected shape
  const sidebarUser = {
    id: user.id || undefined, // Ensure id is present (even if undefined)
    name: user.name || "Unknown User",
    email: user.email || "",
    image: user.image,
  };


  const isOnboarded = await checkUserOnboardingStatus(user.id!);
  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={sidebarUser} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
