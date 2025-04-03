"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Home, Clock, FileText, Shield, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { name: "Risk Dashboard", href: "/riskdashboard", icon: <Clock className="w-4 h-4" /> },
  { name: "Case Studies", href: "/cases", icon: <FileText className="w-4 h-4" /> },
  { name: "Risk Mitigation", href: "/strategies", icon: <Shield className="w-4 h-4" /> },
  { name: "Cost Estimator", href: "/estimator", icon: <DollarSign className="w-4 h-4" /> },
];

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleHelpClick = () => {
    toast("Need help?", {
      description: "Contact our support team at josh2engr+support@gmail.com",
      action: {
        label: "Dismiss",
        onClick: () => {},
      },
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col-reverse gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  className="rounded-full shadow-lg bg-white dark:bg-gray-800 text-npira-blue hover:bg-gray-100 dark:hover:bg-gray-700"
                  size="icon"
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Button>
              </Link>
            ))}
            <Button
              className="rounded-full shadow-lg bg-white dark:bg-gray-800 text-npira-blue hover:bg-gray-100 dark:hover:bg-gray-700"
              size="icon"
              onClick={handleHelpClick}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="sr-only">Get Help</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="rounded-full w-12 h-12 shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
        onClick={toggleOpen}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      </Button>
    </div>
  );
}
