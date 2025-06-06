import Link from "next/link";
// import {  } from "@/.contentlayer/generated";
import { ChevronRightIcon } from "@radix-ui/react-icons";

import Marquee from "@/components/magicui/marquee";
const allShowcases = [
  {
    title: "Tech Innovators",
    image: "/1.png",
    href: "https://www.techinnovators.com",
    affiliation: "Leading in AI Development",
  },
  {
    title: "Green Solutions",
    image: "/2.png",
    href: "https://www.greensolutions.com",
    affiliation: "Pioneers in Sustainable Tech",
  },
  {
    title: "HealthStream",
    image: "/3.png",
    href: "https://www.healthstream.com",
    affiliation: "Revolutionizing Healthcare",
  },
  {
    title: "EduSphere",
    image: "/4.png",
    href: "https://www.edusphere.com",
    affiliation: "Innovative Education Platforms",
  },
  {
    title: "FinTech World",
    image: "/5.png",
    href: "https://www.fintechworld.com",
    affiliation: "Advancing Financial Technology",
  },
  {
    title: "Smart Homes Inc.",
    image: "/6.png",
    href: "https://www.smarthomes.com",
    affiliation: "Leaders in Home Automation",
  },
];

export interface ShowcaseCardProps {
  title: string;
  image: string;
  href: string;
  affiliation?: string;
}
export function ShowcaseCard({
  title,
  image,
  href,
  affiliation,
}: ShowcaseCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-2 group relative overflow-hidden cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        width={500}
        height={300}
        className="size-full object-cover max-h-[300px] rounded-xl"
      />

      <div className="flex flex-col">
        <div className="group inline-flex cursor-pointer items-center justify-start gap-1 duration-200 hover:text-neutral-700 dark:hover:text-neutral-200 text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
          <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        <p className="text-neutral-400 text-sm">{affiliation}</p>
      </div>
    </Link>
  );
}

export default function Showcase() {
  return (
    <section id="showcase" className="container  py-14 ">
      <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-slate-900">
        Showcase
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-slate-900/80">
        Our well designed and interactive user interfaces that meet your needs
      </h3>
      <div className="relative flex flex-col">
        <Marquee className="max-w-screen [--duration:40s]">
          {allShowcases.map((showcase, idx) => (
            <ShowcaseCard key={idx} {...showcase} href={showcase.href} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/12 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
}
