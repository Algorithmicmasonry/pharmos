import React from "react";
import SectionHeading from "./global/SectionHeading";
import FeaturesCard from "./FeaturesCard"; 

export default function ComparisonFeatures() {
  const cons = [
    "Manual stock monitoring prone to errors",
    "No real-time sales or inventory tracking",
    "Paper-based or offline record keeping",
    "Lack of staff accountability and activity logs",
    "Difficult to track expiry dates or stock levels",
  ];

  const pros = [
    "Automated stock alerts via SMS and WhatsApp",
    "Real-time inventory updates with every transaction",
    "Digital sales tracking and transaction history",
    "Role-based staff logins with activity tracking",
    "Expiry monitoring and inventory control built-in",
  ];
  return (
    <div className="text-center">
      <div className="pb-6">
        <SectionHeading title="Why Choose PharmOS for your Business Operations?" />
      </div>
      <div className="py-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FeaturesCard
          features={cons}
          title="Without PharmOS"
          className="bg-red-50 text-red-800"
        />
        <FeaturesCard
          features={pros}
          title="With PharmOS"
          className="bg-green-50 text-green-800"
        />
      </div>
    </div>
  );
}
