"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  // Pre-generate unique keys for animated elements since they're static
  const animatedElements = Array.from({ length: 6 }).map((_, i) => ({
    id: `animated-bg-element-${i}`,
    width: `${Math.random() * 300 + 100}px`,
    height: `${Math.random() * 300 + 100}px`,
    startX: `${Math.random() * 100}%`,
    startY: `${Math.random() * 100}%`,
    endX: `${Math.random() * 100}%`,
    endY: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 15,
  }));

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-r from-npira-blue via-blue-600 to-blue-700 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {animatedElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute rounded-full bg-white/5"
            initial={{
              width: element.width,
              height: element.height,
              x: element.startX,
              y: element.startY,
              opacity: 0
            }}
            animate={{
              x: [element.startX, element.endX],
              y: [element.startY, element.endY],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: element.duration,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nigerian Property Investment
            <br className="hidden sm:inline" />
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Risk Analyzer
            </motion.span>
          </motion.h1>

          <motion.p
            className="max-w-[800px] text-gray-200 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Comprehensive analysis and risk assessment tools for Nigerian diasporans
            looking to invest in homeland property.
          </motion.p>

          <motion.div
            className="space-x-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="dashboard/riskdashboard">
              <Button
                size="lg"
                className="bg-white text-npira-blue hover:bg-gray-100 hover:text-npira-blue/90 font-medium"
              >
                Explore Risk Dashboard
              </Button>
            </Link>
            <Link href="dashboard/cases">
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                View Case Studies
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
