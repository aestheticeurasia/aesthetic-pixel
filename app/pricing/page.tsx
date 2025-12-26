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
import { Badge } from "@/components/ui/badge";

export const pricingPlans = [
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
    <section className="py-10 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Pricing for every stage
        </h2>
        <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Switch between monthly and yearly billing and choose what fits you
          best.
        </p>

        {/* TOGGLE */}
        <div className="mt-8 flex items-center justify-center gap-4">
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
            "
          />

          <span className="text-sm text-zinc-300">Yearly</span>

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
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                      <li key={i} className="flex justify-between border-b border-zinc-800 pb-3">
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
      </div>
    </section>
  );
}
