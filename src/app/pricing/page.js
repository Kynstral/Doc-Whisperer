"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { FaCheckCircle } from "react-icons/fa";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];

const tiers = [
  {
    name: "Free Plan",
    id: "tier-free",
    href: "#",
    price: { monthly: "$0", annually: "$0" },
    description:
      "Access to basic features with limited documentation capacity.",
    features: [
      "1 project",
      "Up to 500 lines of code documented",
      "Basic code comments",
      "Community support",
    ],
    mostPopular: false,
  },
  {
    name: "Pro Plan",
    id: "tier-pro",
    href: "#",
    price: { monthly: "$10", annually: "$100" },
    description:
      "Advanced documentation features with increased project capacity.",
    features: [
      "10 projects",
      "Up to 10,000 lines of code documented",
      "Advanced code comments",
      "Priority support",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise Plan",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: "$49", annually: "$500" },
    description: "Unlimited documentation features for large-scale projects.",
    features: [
      "Unlimited projects",
      "Unlimited lines of code documented",
      "Custom API integration",
      "Dedicated support",
      "Code quality analysis",
    ],
    mostPopular: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <>
      <Header />
      <div className=" py-24 sm:py-32 custom-scrollbar">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d2d4d5] to-[#d2d4d5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight text-[#1fff67] sm:text-5xl">
              Choose a plan that fits your needs
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-[#d2d4d5]">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Whether you're a freelancer or running an enterprise, we have the
            right plan for you.
          </p>
          <div className="mt-16 flex justify-center">
            <fieldset aria-label="Payment frequency">
              <RadioGroup
                value={frequency}
                onChange={setFrequency}
                className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
              >
                {frequencies.map((option) => (
                  <Radio
                    key={option.value}
                    value={option}
                    className={({ checked }) =>
                      classNames(
                        checked ? "bg-[#1fff67] text-black" : "",
                        "cursor-pointer rounded-full px-2.5 py-1 ",
                      )
                    }
                  >
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </fieldset>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-white/5 ring-2 ring-[#1fff67]"
                    : "ring-1 ring-white/10",
                  "rounded-3xl p-8 xl:p-10",
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className="text-lg font-semibold leading-8 text-[#d2d4d5]"
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-[#1fff67] px-2.5 py-1 text-xs font-semibold leading-5 text-[#020201]">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-[#d2d4d5]">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-[#1fff67]">
                    {tier.price[frequency.value]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-[#1fff67]">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-[#1fff67] text-[#020201] shadow-sm hover:bg-[#1bff56] focus-visible:outline-[#1fff67]"
                      : "bg-white/10 text-[#d2d4d5] hover:bg-white/20 focus-visible:outline-white",
                    "cursor-not-allowed mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  )}
                >
                  Choose Plan
                </a>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-[#d2d4d5] xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <FaCheckCircle
                        className="h-6 w-5 flex-none text-[#1fff67]"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:bottom-[-10rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d2d4d5] to-[#d2d4d5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
