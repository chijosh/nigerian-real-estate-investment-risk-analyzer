"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";
import { Shield, FileText, DollarSign, MapPin } from "lucide-react";

const features = [
  {
    title: "Risk Assessment",
    description: "Interactive risk dashboard showcasing legal, financial, logistical, and market risks in Nigerian property investment.",
    icon: <Shield className="w-10 h-10 text-npira-blue" />,
  },
  {
    title: "Case Studies",
    description: "Real-world examples of both cautionary tales and success stories from diaspora investors.",
    icon: <FileText className="w-10 h-10 text-npira-blue" />,
  },
  {
    title: "Cost Estimation",
    description: "Interactive tool to estimate total investment costs including hidden fees and infrastructure expenses.",
    icon: <DollarSign className="w-10 h-10 text-npira-blue" />,
  },
  {
    title: "Regional Analysis",
    description: "Location-specific insights for major Nigerian regions and their unique investment landscapes.",
    icon: <MapPin className="w-10 h-10 text-npira-blue" />,
  },
];

export default function FeatureCards() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg dark:hover:shadow-gray-800/30 hover:border-npira-blue/20 border-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50 dark:bg-blue-950">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
