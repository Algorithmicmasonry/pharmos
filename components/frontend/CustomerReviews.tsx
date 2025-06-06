import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import SectionHeading from "../global/SectionHeading";

const reviews = [
  {
    name: "Mrs. Chinelo Umeh",
    username: "@vitalrx_enugu",
    body: "PharmOs helped us track our inventory across three branches without hiring extra staff. The stock alerts save us every month.",
    img: "https://avatar.vercel.sh/chinelo",
  },
  {
    name: "Dr. Musa Ibrahim",
    username: "@lifemed_pharmacy",
    body: "The WhatsApp alerts and POS system are top-notch. PharmOs feels like it was built specifically for Nigerian pharmacies.",
    img: "https://avatar.vercel.sh/musa",
  },
  {
    name: "Blessing Okoro",
    username: "@bless_inventory",
    body: "Since using PharmOs, we’ve reduced expired product losses by over 40%. It’s the easiest pharmacy software I’ve used.",
    img: "https://avatar.vercel.sh/blessing",
  },
  {
    name: "Chuka Eze",
    username: "@chuka_sales",
    body: "Managing sales, staff shifts, and inventory used to be a nightmare. PharmOs brought everything into one clean dashboard.",
    img: "https://avatar.vercel.sh/chuka",
  },
  {
    name: "Hauwa Bello",
    username: "@greenmedics_ng",
    body: "PharmOs keeps me updated even when I’m not at the store. The mobile alerts give me full control from anywhere.",
    img: "https://avatar.vercel.sh/hauwa",
  },
  {
    name: "Tope Ayodele",
    username: "@topebooks",
    body: "Finally, a Nigerian-built solution that understands the challenges of running a pharmacy here. PharmOs gets it right.",
    img: "https://avatar.vercel.sh/tope",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function CustomerReviews() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="pb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-slate-200">
          What are Our Customers Saying
        </h1>
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
