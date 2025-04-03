"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Home, Clock, FileText, Shield, DollarSign, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", icon: <Home className="w-4 h-4 mr-2" /> },
  { name: "Risk Dashboard", href: "/dashboard/riskdashboard", icon: <Clock className="w-4 h-4 mr-2" /> },
  { name: "Case Studies", href: "/dashboard/cases", icon: <FileText className="w-4 h-4 mr-2" /> },
  { name: "Risk Mitigation", href: "/dashboard/strategies", icon: <Shield className="w-4 h-4 mr-2" /> },
  { name: "Cost Estimator", href: "/dashboard/estimator", icon: <DollarSign className="w-4 h-4 mr-2" /> },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl tracking-tight">
              NPI<span className="text-npira-blue">RA</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "outline"}
                  className={`relative transition-all duration-200 ${isActive ? 'bg-npira-red hover:bg-npira-red/90' : ''}`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-npira-red"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="ml-2 rounded-full"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${isActive ? 'bg-npira-red hover:bg-npira-red/90' : ''}`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
              <Button
                variant="ghost"
                className="justify-start"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    <span>Dark mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    <span>Light mode</span>
                  </>
                )}
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
