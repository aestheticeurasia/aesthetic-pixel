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
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

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

export const pricingPlans: PricingPlan[] = [
  {
    id: "studio-pass",
    title: "Studio pass",
    description: "Ideal for one shoot per year",
    highlight: false,
    pricing: {
      monthly: {
        price: 18500,
        label: "studio fee",
        note: "(per booking)",
      },
      yearly: {
        price: 18500,
        label: "studio fee",
        note: "(per booking)",
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
    id: "basic",
    title: "Basic membership",
    description: "Ideal for more than one shoot per year",
    highlight: false,
    pricing: {
      monthly: {
        price: 2400,
        label: "/monthly",
        note: "(billed monthly)",
      },
      yearly: {
        price: 1500,
        label: "/annually",
        note: "(billed annually)",
        save: "Save 30%",
      },
    },
    cta: "Get started",
    features: [
      { label: "Studio pass", value: "FREE", highlight: true },
      { label: "Price per photo", value: "৳4,800" },
      { label: "Models & styling", value: "Full price" },
      { label: "Shoot upgrades", value: "Full price" },
      { label: "Premium edits", value: "৳1,100 each" },
      { label: "Edit delivery", value: "48 hours" },
    ],
  },

  {
    id: "standard",
    title: "Standard",
    description: "Ideal if you use upgrades, premium edits or 3+ shoots.",
    highlight: true,
    badge: "Best value",
    pricing: {
      monthly: {
        price: 8500,
        label: "/monthly",
        note: "(billed monthly)",
      },
      yearly: {
        price: 6000,
        label: "/annually",
        note: "(billed annually)",
        save: "Save 30%",
      },
    },
    cta: "Get started",
    features: [
      { label: "Studio pass", value: "FREE", highlight: true },
      { label: "Price per photo", value: "৳4,800" },
      { label: "Models & styling", value: "10% OFF", highlight: true },
      { label: "Shoot upgrades", value: "10% OFF", highlight: true },
      { label: "Premium edits", value: "FREE", highlight: true },
      { label: "Edit delivery", value: "24 hours 🔥" },
    ],
  },

  {
    id: "enterprise",
    title: "Enterprise",
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

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* Main Pricing */}
      <section className="py-10 px-6 lg:px-24 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Pricing for every stage
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Switch between monthly and yearly billing and choose what fits you
          best.
        </p>

        {/* TOGGLE */}
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

        {/* CARDS */}
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
      </section>

      {/* custom Qoute */}
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
