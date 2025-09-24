"use client";

import React, { useState } from "react";
import { Check, Star } from "lucide-react";
import { motion } from "framer-motion";

// shadcn/ui components (assumes you have shadcn/ui set up)
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
import Link from "next/link";

type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  features: string[];
  highlighted?: boolean;
  cta?: string;
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 0,
    features: [
      "Single user",
      "Basic components",
      "Community support",
      "Limited updates",
    ],
    cta: "Get started",
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 24,
    features: [
      "Up to 5 users",
      "All components",
      "Priority support",
      "Monthly updates",
    ],
    highlighted: true,
    cta: "Start free trial",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: 99,
    features: [
      "Unlimited seats",
      "Design tokens & Figma kit",
      "Dedicated support",
      "SLA & onboarding",
    ],
    cta: "Contact sales",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  // yearly discount: pay for 10 months when yearly selected (≈16.67% off)
  const priceFor = (monthly: number) =>
    yearly ? Math.round(monthly * 10) : monthly;

  return (
    <section className="py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Pricing for every stage
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Simple, predictable pricing — switch between monthly and yearly
            billing and pick the best plan for your product or team.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-muted/40 p-1">
            <span className="px-3 text-sm">Monthly</span>
            <Switch checked={yearly} onCheckedChange={setYearly} />
            <span className="px-3 text-sm">Yearly</span>
            <Badge className="ml-2">Save 2 months</Badge>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative my-5 overflow-visible shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlighted ? "scale-105 z-10 border-2 border-primary" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="flex items-center gap-2">
                    <Star className="h-4 w-4" /> Most popular
                  </Badge>
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="mt-1">
                  {plan.id === "starter"
                    ? "Perfect for getting started"
                    : plan.id === "pro"
                    ? "For freelancers and small teams"
                    : "Scale with enterprise-grade features"}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-extrabold">
                    {plan.priceMonthly === 0 ? (
                      "Free"
                    ) : (
                      <span>
                        $
                        {yearly
                          ? priceFor(plan.priceMonthly)
                          : plan.priceMonthly}
                        <span className="text-sm font-medium text-muted-foreground">
                          /{yearly ? "year" : "mo"}
                        </span>
                      </span>
                    )}
                  </span>
                </div>

                <ul className="mt-10 grid gap-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="h-5 w-5 mt-1" />
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* <div className="mt-6">
                  <Button
                    className={`w-full ${plan.highlighted ? "bg-primary text-white dark:text-black" : ""}`}
                    variant={plan.highlighted ? undefined : "ghost"}
                  >
                    {plan.cta}
                  </Button>
                </div> */}

                {/* small footnote */}
                {/* <p className="mt-4 text-xs text-muted-foreground">
                  {plan.id === "enterprise"
                    ? "Custom billing and agreements"
                    : plan.priceMonthly === 0
                    ? "No credit card required"
                    : yearly
                    ? "Billed yearly — save 2 months"
                    : "Cancel anytime"}
                </p> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* comparison row */}
        <div className="mt-12 bg-muted/40 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-center">
            Compare features
          </h3>

          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-3">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="pb-3 text-center">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Product Photography",
                  "Videography",
                  "Ecommerce Photography",
                  "Corporate Photography",
                  "Jewelry Photography",
                  "Fashion Photography",
                ].map((feature) => (
                  <tr key={feature} className="border-t">
                    <td className="py-3">{feature}</td>
                    {PLANS.map((p) => (
                      <td key={p.id} className="py-3 text-center">
                        {p.features.some((f) =>
                          f
                            .toLowerCase()
                            .includes(feature.split(" ")[0].toLowerCase())
                        ) ? (
                          <Check className="inline-block h-4 w-4" />
                        ) : (
                          <span className="text-muted-foreground">
                            <span className="sr-only">{feature}</span>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Couldn&apos;t meet your needs? 
        </p>
        <Button asChild className="mt-5">
          <Link href="/contact">Request a custom quote</Link>
        </Button>
      </div>
    </section>
  );
}
