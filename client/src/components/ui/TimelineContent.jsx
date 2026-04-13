import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * TimelineContent — scroll-triggered reveal wrapper.
 * Replaces the missing timeline-animation dependency.
 * Uses IntersectionObserver to trigger framer-motion animations on scroll.
 */
export function TimelineContent({
  children,
  className,
  animationNum = 0,
  timelineRef,
  customVariants,
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Comp = motion[as] || motion.div;

  return (
    <Comp
      ref={ref}
      className={className}
      custom={animationNum}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={customVariants}
      {...props}
    >
      {children}
    </Comp>
  );
}
