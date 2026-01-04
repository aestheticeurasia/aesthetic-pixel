"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, Camera, Layout, Share2, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type PricingPlan = {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  pricing: {
    monthly: {
      price: number | null;
      label?: string;
      note?: string;
      save?: string;
    };
    yearly: {
      price: number | null;
      label?: string;
      note?: string;
      save?: string;
    };
  };
  cta: string;
  features: {
    label: string;
    value?: string;
    highlight?: boolean;
  }[];
};

const pricingPlans: PricingPlan[] = [
  {
    id: "studio-pass",
    title: "Studio pass",
    description: "Ideal for occasional shoots",
    highlight: false,
    pricing: {
      monthly: {
        price: 800,
        label: "studio fee",
        note: "(per hour)",
      },
      yearly: {
        price: 18500,
        label: "studio fee",
        note: "(per hour)",
      },
    },
    cta: "Get started",
    features: [
      { label: "Studio pass", value: "৳18,500" },
      { label: "Price per photo", value: "৳4,800" },
      { label: "Models & styling", value: "Full price" },
      { label: "Shoot upgrades", value: "Full price" },
      { label: "Premium edits", value: "৳1,100 each" },
      { label: "Edit delivery", value: "72 hours" },
    ],
  },
  {
    id: "Photography Quote",
    title: "Photography Quote",
    description: "Ideal for occasional shoots",
    highlight: false,
    pricing: {
      monthly: {
        price: 800,
        label: "studio fee",
        note: "(per hour)",
      },
      yearly: {
        price: 18500,
        label: "studio fee",
        note: "(per hour)",
      },
    },
    cta: "Get started",
    features: [
      { label: "Studio pass", value: "৳18,500" },
      { label: "Price per photo", value: "৳4,800" },
      { label: "Models & styling", value: "Full price" },
      { label: "Shoot upgrades", value: "Full price" },
      { label: "Premium edits", value: "৳1,100 each" },
      { label: "Edit delivery", value: "72 hours" },
    ],
  },

  



  {
    id: "Custom",
    title: "Custom",
    description: "Custom packages for larger companies.",
    highlight: false,
    pricing: {
      monthly: { price: null },
      yearly: { price: null },
    },
    cta: "Talk to an expert",
    features: [
      { label: "Discounts on all services" },
      { label: "Dedicated account management" },
      { label: "Creative team support" },
      { label: "Flexible payment options" },
    ],
  },
];

const featureLabels = pricingPlans[0]?.features.map((f) => f.label) ?? [];


//components
 // Sub-component for Category Headers
  const CategoryRow = ({
    title,
    icon,
    desc,
  }: {
    title: string;
    icon: any;
    desc: string;
  }) => (
    <tr className="bg-[#222222]">
      <td colSpan={5} className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-md">{icon}</div>
          <div>
            <div className="text-sm font-bold text-white leading-none">
              {title}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">{desc}</div>
          </div>
        </div>
      </td>
    </tr>
  );

  // Sub-component for individual Feature Rows
  const FeatureRow = ({ label }: { label: string }) => (
    <tr className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors group">
      <td className="px-6 py-4 text-sm text-zinc-400 group-hover:text-zinc-200">
        {label}
      </td>
      {pricingPlans.map((plan) => {
        const feature = plan.features.find((f) => f.label === label);
        return (
          <td
            key={plan.id}
            className={cn(
              "px-6 py-4 text-center text-sm transition-colors",
              plan.highlight && "bg-red-900/5", 
              feature?.highlight ? "text-red-500 font-bold" : "text-zinc-300"
            )}
          >
            {feature?.value ?? "—"}
          </td>
        );
      })}
    </tr>
  );

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Main Pricing */}
      <section className="py-10 px-6 max-w-7xl mx-auto text-center">
        <div className="bg-[url('/layoutComponents/pricingBlurBottom.svg')] bg-transparent bg-no-repeat bg-bottom-right bg-contain" />
        <h2 className="text-4xl font-extrabold text-white">
          Pricing for every stage
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Switch between monthly and yearly billing and choose what fits you
          best.
        </p>

        {/* Main Pricing: Toggle */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-center gap-4">
          <div className="flex gap-5 justify-center items-center">
            <span className="text-sm text-zinc-300">Monthly</span>
            <Switch
              checked={yearly}
              onCheckedChange={setYearly}
              className="
              scale-150
              data-[state=unchecked]:bg-zinc-700
              data-[state=checked]:bg-red-600
              [&>span]:bg-white
              transition-all
              cursor-pointer
            "
            />
            <span className="text-sm text-zinc-300">Yearly</span>
          </div>
          <span
            className={`
              text-sm text-red-600 font-bold
              transition-all duration-300
              ${
                yearly ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }
            `}
          >
            Save <span className="text-lg">30%</span>
          </span>
        </div>

        {/*Main Pricing: Cards */}
        <div className="lg:mt-10 mt-3 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => {
            const price = yearly ? plan.pricing.yearly : plan.pricing.monthly;

            return (
              <Card
                key={plan.id}
                className={`relative bg-[#0a0a0b] ${
                  plan.highlight
                    ? "border-[#EF444480] scale-105"
                    : "border border-zinc-800"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute top-0 right-0 bg-[#dc2626] text-white font-bold text-sm px-6 rounded-tr-xl rounded-bl-xl ">
                    Best value
                  </span>
                )}

                <CardHeader>
                  <CardTitle className="text-xl text-white">
                    {plan.title}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div>
                    {price?.price ? (
                      <div className="text-3xl font-bold text-white">
                        ৳{price.price}
                        <span className="text-sm text-muted-foreground ml-1">
                          {price.label}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {price.note}
                        </div>
                      </div>
                    ) : (
                      <div className="text-3xl font-bold text-white">
                        Custom
                      </div>
                    )}
                  </div>
                  <Button
                    asChild
                    className={`rounded-3xl my-6 w-full ${
                      plan.highlight ? "bg-red-600" : ""
                    }`}
                  >
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex justify-between border-b border-zinc-800 pb-3"
                      >
                        <span className="text-muted-foreground">{f.label}</span>
                        <span className="text-white font-bold"> {f.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground mt-5 lg:mt-15 text-sm">
          *Production costs are not included in the membership. Your shoot cost
          is the combination of models & services + how many assets you order.
        </p>
      </section>

      {/* Collapsible Pricing */}
      <div className="flex flex-col w-full md:px-30">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          {/* Trigger */}
          <div className="w-full flex justify-center">
            <CollapsibleTrigger asChild>
              <Button
                size="lg"
                className="rounded-2xl bg-[#18181b] border-[#2f2f31] flex items-center gap-2 cursor-pointer"
              >
                <h4 className="text-sm font-semibold">Full Feature List</h4>
                <ChevronsUpDown />
              </Button>
            </CollapsibleTrigger>
          </div>

          {/* Content */}
          <CollapsibleContent
            className="lg:px-20 px-6 overflow-hidden
    data-[state=open]:animate-in
    data-[state=open]:fade-in
    data-[state=open]:slide-in-from-top-4
    data-[state=open]:duration-700
    data-[state=open]:ease-out

    data-[state=closed]:animate-out
    data-[state=closed]:fade-out
    data-[state=closed]:slide-out-to-top-4
    data-[state=closed]:duration-300"
          >
            <div className="relative bg-black py-8 px-4">
              {/* Heading */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white">
                  Full Feature Details
                </h2>
                <p className="mt-3 text-sm text-zinc-400">
                  Find the perfect set of tools for your content production
                  needs.
                </p>
              </div>

              <div className="max-w-8xl mx-auto overflow-hidden rounded-lg border border-zinc-800 bg-[#121212] shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#1a1a1a]">
                        <th className="px-6 py-8 text-sm font-medium text-zinc-400 w-1/4">
                          Feature Category
                        </th>
                        {pricingPlans.map((plan) => (
                          <th
                            key={plan.id}
                            className={cn(
                              "px-6 py-8 text-center text-sm font-semibold transition-all relative",
                              plan.highlight
                                ? "bg-[#1e1a1a] text-white border-t-2 border-red-500"
                                : "text-zinc-300 border-t-2 border-transparent"
                            )}
                          >
                            {plan.title}
                            {plan.badge && (
                              <div className="absolute top-2 left-0 right-0 text-[10px] uppercase tracking-wider text-red-500 font-bold">
                                {plan.badge}
                              </div>
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <CategoryRow
                        title="Studio services"
                        icon={<Camera className="w-4 h-4 text-red-500" />}
                        desc="Professional photo & video production services."
                      />
                      {featureLabels.map((label) => (
                        <FeatureRow key={label} label={label} />
                      ))}

                      <CategoryRow
                        title="Platform"
                        icon={<Layout className="w-4 h-4 text-red-500" />}
                        desc="Manage, optimize and edit content."
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Custom Quote */}
      <section className="px-6 lg:px-24 my-10">
        <div className="flex flex-col lg:flex-row text-center lg:text-start justify-center lg:justify-between items-center p-10 border-[#242426] border-2 rounded-xl bg-gradient-to-r from-[#18181b] to-[#090102] gap-5">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Coudn't meet your needs?{" "}
            </h3>
            <p className="mt-3 text-muted-foreground">
              We offer tailored packages for large scale operations.
            </p>
          </div>
          <Button className="font-bold rounded-3xl bg-white text-primary hover:bg-white cursor-pointer py-5">
            <Link
              href="/contact"
              className="flex flex-row items-center gap-2 justify-center"
            >
              <span className="hover:text-red-700">
                {" "}
                Request a custom quote
              </span>
              <span className="hover:text-white">
                <ArrowRight />
              </span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Call Details */}
      <section className="bg-[#0c0c0d] py-[48px] mt-20 border-b-3 border-transparent hover:border-red-700 transition-all duration-300">
        <div className="flex flex-col lg:flex-row px-4 sm:px-8 lg:px-[160px] gap-10 lg:gap-0 justify-center lg:justify-between items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <h4 className="text-red-600 uppercase font-bold text-sm tracking-wide">
                Call Now
              </h4>
              <h1 className="font-bold text-red-600 text-3xl">
                +880 1711-205200
              </h1>
            </div>

            <div>
              <h1 className="text-white font-bold text-2xl leading-tight">
                Get One Step Digital Solution Under One Roof
              </h1>
              <p className="text-muted-foreground mt-3">
                Web Development, Creative Writing, Digital Marketing, Graphics &
                Video Editing, & so on.
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center lg:justify-end">
            <div className="relative w-full sm:w-[420px]">
              <Input
                type="email"
                placeholder="Enter your email"
                className="
                w-full
                border-[#3f3f46]
                bg-[#070707]
                text-white
                placeholder:text-gray-500
                text-lg
                rounded-full
                pl-7 pr-[150px]
                py-7
                focus:border-red-600
                focus:ring-2 focus:ring-red-600/30
                transition-all
              "
              />

              <Button
                className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
                bg-[#e7000b]
                text-white
                text-md
                rounded-full
                px-6
                py-5
                hover:bg-[#ef4444]
                active:scale-[0.98]
                transition-all
                cursor-pointer
              "
              >
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}