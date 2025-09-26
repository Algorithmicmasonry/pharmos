import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from "./global/SectionHeading";

export function FAQ() {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 dark:text-slate-900">
      <SectionHeading title="Frequently Asked Questions" />
      <div className="text-xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is PharmOS?</AccordionTrigger>
            <AccordionContent>
              PharmOS is an all-in-one operating system for pharmacies in
              Nigeria. It helps manage inventory, POS transactions, staff, stock
              alerts, accounting, and more — all from a single dashboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How does the 60-day free trial work?
            </AccordionTrigger>
            <AccordionContent>
              Every new pharmacy gets full access to PharmOS for 60 days — no
              payment required. After the trial, you can choose a pricing plan
              that fits your business size.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              What happens after my free trial ends?
            </AccordionTrigger>
            <AccordionContent>
              You&apos;ll need to subscribe to one of our pricing plans to continue
              using PharmOS. Your data remains safe, and you can pick up right
              where you left off.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Do you help with onboarding?</AccordionTrigger>
            <AccordionContent>
              Yes. We help you set up your pharmacy, onboard your inventory,
              train your staff, and configure your locations. We handle
              everything so you can focus on running your business.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              Can I manage multiple pharmacy branches?
            </AccordionTrigger>
            <AccordionContent>
              Absolutely. PharmOS is designed for both single and multi-branch
              pharmacies. You can monitor all your locations from one dashboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              Does PharmOS work for small pharmacies?
            </AccordionTrigger>
            <AccordionContent>
              Yes! We have a dedicated plan for small-scale pharmacies that
              includes all essential features — inventory, POS, staff
              management, and more.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger>
              What platforms does PharmOS run on?
            </AccordionTrigger>
            <AccordionContent>
              PharmOS is a web-based platform. You can use it on desktop,
              tablet, or mobile through your browser. We also offer tools that
              integrate with barcode scanners for easier inventory handling.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger>
              Can I use PharmOS for stock alerts?
            </AccordionTrigger>
            <AccordionContent>
              Yes. PharmOS notifies you when stock is low via WhatsApp, SMS, and
              email. You&apos;ll never run out of fast-moving or essential
              medications again.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9">
            <AccordionTrigger>
              Can my staff have different levels of access?
            </AccordionTrigger>
            <AccordionContent>
              Yes. You can add staff accounts and assign permissions based on
              roles, locations, and responsibilities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10">
            <AccordionTrigger>Is there an e-commerce feature?</AccordionTrigger>
            <AccordionContent>
              Yes. PharmOS includes an optional online store where you can
              showcase and sell your products to customers in your area.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11">
            <AccordionTrigger>
              Do I need special hardware to use PharmOS?
            </AccordionTrigger>
            <AccordionContent>
              No. You can use PharmOS with your existing computers and barcode
              scanners. Our system is designed to work without expensive
              hardware requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12">
            <AccordionTrigger>
              Does PharmOS track product expiry dates?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Our system helps you monitor expiration dates and avoid
              selling expired medications, which helps maintain regulatory
              compliance and customer trust.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13">
            <AccordionTrigger>
              What kind of reports can I generate?
            </AccordionTrigger>
            <AccordionContent>
              You can generate sales reports, inventory levels, staff
              performance, and location-based analytics — all accessible from
              your dashboard.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-14">
            <AccordionTrigger>What are the pricing plans?</AccordionTrigger>
            <AccordionContent>
              After your 60-day free trial:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  ₦15,000/month or ₦150,000/year for small-scale pharmacies
                </li>
                <li>
                  ₦25,000/month for medium-sized pharmacies with 1 location
                </li>
                <li>₦35,000/month for multi-location pharmacies</li>
                <li>
                  For pharmacies with 10+ locations, please{" "}
                  <a href="/contact" className="underline text-blue-600">
                    contact sales
                  </a>{" "}
                  for a custom enterprise quote
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-15">
            <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
            <AccordionContent>
              Yes. PharmOS is a subscription-based service. You can cancel
              anytime, and you won’t be charged for the next billing cycle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
