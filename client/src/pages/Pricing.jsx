import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Sparkles } from "../components/ui/Sparkles";
import { TimelineContent } from "../components/ui/TimelineContent";
import { VerticalCutReveal } from "../components/ui/VerticalCutReveal";
import { cn } from "../lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic Care",
    description: "Essential dental services for routine checkups and hygiene maintenance",
    price: 49,
    yearlyPrice: 399,
    buttonText: "Book Now",
    buttonVariant: "outline",
    includes: [
      "Basic includes:",
      "General Checkup",
      "Teeth Cleaning",
      "X-Ray Screening",
      "Fluoride Treatment",
      "Oral Health Report",
      "WhatsApp Confirmation",
      "Priority Scheduling",
    ],
  },
  {
    name: "Premium",
    description: "Complete dental care with cosmetic and restorative treatments included",
    price: 129,
    yearlyPrice: 999,
    buttonText: "Get Premium",
    buttonVariant: "default",
    popular: true,
    includes: [
      "Everything in Basic, plus:",
      "Teeth Whitening",
      "Cavity Filling",
      "Root Canal Therapy",
      "Custom Mouth Guard",
      "Emergency Visits",
      "Family Discount (10%)",
      "Dedicated Care Manager",
    ],
  },
  {
    name: "Family Plan",
    description: "Comprehensive coverage for the whole family with unlimited visits",
    price: 249,
    yearlyPrice: 1999,
    buttonText: "Get Family Plan",
    buttonVariant: "outline",
    includes: [
      "Everything in Premium, plus:",
      "Up to 5 Family Members",
      "Braces & Invisalign",
      "Dental Implants",
      "Pediatric Specialists",
      "Annual Deep Cleaning",
      "Cosmetic Consultation",
      "24/7 Emergency Line",
    ],
  },
];

const PricingSwitch = ({ onSwitch }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-slate-900 border border-slate-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-300"
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-primary-500 border-primary-500 bg-gradient-to-t from-primary-500 to-primary-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-300"
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-primary-500 border-primary-500 bg-gradient-to-t from-primary-500 to-primary-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Yearly <span className="text-xs opacity-70">Save 30%</span></span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef(null);

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value) =>
    setIsYearly(parseInt(value) === 1);

  return (
    <div
      className="min-h-screen mx-auto relative bg-slate-950 overflow-x-hidden"
      ref={pricingRef}
      id="pricing"
    >
      {/* Sparkle particles background */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-full overflow-hidden"
        style={{ maskImage: "radial-gradient(50% 50%, white, transparent)" }}
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:70px_80px]" />
        <Sparkles
          density={1200}
          speed={1}
          color="#17b38d"
          className="absolute inset-x-0 bottom-0 h-full w-full"
          style={{ maskImage: "radial-gradient(50% 50%, white, transparent 85%)" }}
        />
      </TimelineContent>

      {/* Glow blob */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage: "radial-gradient(circle at center, #17b38d40 0%, transparent 70%)",
          opacity: 0.5,
          mixBlendMode: "screen",
        }}
      />

      {/* Header */}
      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-6">
        <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 40,
              delay: 0,
            }}
          >
            Dental Plans That Fit Your Needs
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-400 text-lg"
        >
          Choose the perfect plan for you and your family. All plans include WhatsApp booking confirmation.
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-6 mx-auto px-6">
        {plans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            as="div"
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={`relative text-white border-slate-700 ${
                plan.popular
                  ? "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-[0px_-13px_300px_0px_rgba(23,179,141,0.3)] z-20"
                  : "bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 z-10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold shadow-dental">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="text-3xl mb-2 font-display font-bold">{plan.name}</h3>
                </div>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold">
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-gray-400 ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  className={`w-full mb-6 p-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-t from-primary-500 to-primary-600 shadow-lg shadow-primary-900/50 border border-primary-500 text-white hover:brightness-110"
                      : "bg-gradient-to-t from-slate-950 to-slate-700 shadow-lg shadow-slate-900 border border-slate-600 text-white hover:border-primary-500/50"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <div className="space-y-3 pt-4 border-t border-slate-700">
                  <h4 className="font-medium text-base mb-3 text-gray-300">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 bg-primary-500/60 rounded-full" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
