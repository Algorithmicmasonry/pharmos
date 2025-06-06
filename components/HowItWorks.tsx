"use client";
import React, { useState } from "react";
import SectionHeading from "./global/SectionHeading";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CheckCircle, UserPlus, PackagePlus, Users, LayoutDashboard, Plus, Minus } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "1. Create Your Pharmacy Account",
      content: <StepOne />,
      media: { type: "image", media: "/pharmos-step1.png" },
    },
    {
      step: 2,
      title: "2. Import Products & Inventory",
      content: <StepTwo />,
      media: { type: "image", media: "/pharmos-step2.png" },
    },
    {
      step: 3,
      title: "3. Add & Train Staff Members",
      content: <StepThree />,
      media: { type: "image", media: "/pharmos-step3.png" },
    },
    {
      step: 4,
      title: "4. Onboard All Branch Locations",
      content: <StepFour />,
      media: { type: "image", media: "/pharmos-step4.png" },
    },
    {
      step: 5,
      title: "5. Monitor Everything From One Dashboard",
      content: <StepFive />,
      media: { type: "video", media: "/pharmos-step5.mp4" },
    },
  ];

  const [activeBtn, setActiveBtn] = useState(steps[0]);
  const mediaType = activeBtn.media.type;

  return (
    <div className="text-center dark:text-slate-800">
      <div className="pb-6">
        <SectionHeading title="How PharmOS Works" />
      </div>
      <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="pr-8 space-y-4 flex flex-col">
          {steps.map((btn, i) => {
            const isLast = i === steps.length - 1;
            const isActive = activeBtn.step === btn.step;
            return (
              <button
                key={btn.step}
                onClick={() => setActiveBtn(btn)}
                className={cn("text-left border-b pb-3", isLast && "border-0")}
              >
                <div className="flex items-center justify-between text-xl">
                  <h2 className={cn("", isActive && "text-primary")}>
                    {btn.title}
                  </h2>
                  {isActive ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                {isActive && btn.content}
              </button>
            );
          })}
        </div>
        <div>
          {mediaType === "image" ? (
            <Image
              width={1080}
              height={951}
              alt="PharmOS How It Works"
              src={activeBtn.media.media}
            />
          ) : (
            <video src={activeBtn.media.media} loop autoPlay muted className="rounded-xl shadow-md"></video>
          )}
        </div>
      </div>
    </div>
  );
}

function StepOne() {
  return (
    <div className="py-4">
      <p>Start by creating an account for your pharmacy and defining all your store locations.</p>
      <div className="flex items-center font-semibold pt-3">
        <UserPlus className="w-5 h-5 mr-2" />
        <p>Setup takes under 10 minutes</p>
      </div>
    </div>
  );
}

function StepTwo() {
  return (
    <div className="py-4">
      <p>We help you onboard all your products and inventory into the system — fast and organized.</p>
      <div className="flex items-center font-semibold pt-3">
        <PackagePlus className="w-5 h-5 mr-2" />
        <p>Barcode & category-based upload support</p>
      </div>
    </div>
  );
}

function StepThree() {
  return (
    <div className="py-4">
      <p>We help you add your staff members to the platform and we train them on how to use PharmOS for daily operations.</p>
      <div className="flex items-center font-semibold pt-3">
        <Users className="w-5 h-5 mr-2" />
        <p>Role-based permissions & training videos included</p>
      </div>
    </div>
  );
}

function StepFour() {
  return (
    <div className="py-4">
      <p>We repeat the setup, onboarding, and training for all your store branches — no matter how many.</p>
      <div className="flex items-center font-semibold pt-3">
        <CheckCircle className="w-5 h-5 mr-2" />
        <p>Multi-location support out of the box</p>
      </div>
    </div>
  );
}

function StepFive() {
  return (
    <div className="py-4">
      <p>Relax. Monitor sales, inventory, employees, and reports — all from a single smart dashboard.</p>
      <div className="flex items-center font-semibold pt-3">
        <LayoutDashboard className="w-5 h-5 mr-2" />
        <p>Real-time business insights in one place</p>
      </div>
    </div>
  );
}
