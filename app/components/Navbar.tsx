"use client";

import React, { JSX, useEffect, useState } from "react";
import Link from "next/link";
import {
  Home,
  PieChart,
  BookOpen,
  ShieldCheck,
  DollarSign,
  Menu,
  Sun, 
  Moon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

export const Navbar = () => {
  const [theme, setTheme] = useState("acid");

  const toggleTheme = () => {
    setTheme(theme === "coffee" ? "acid" : "coffee");
  };

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const navItems: {
    label: string;
    icon: JSX.Element;
    value: "landing" | "riskdashboard" | "cases" | "strategies" | "estimator";
  }[] = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5 mr-2" />,
      value: "landing",
    },
    {
      label: "Risk Dashboard",
      icon: <PieChart className="h-5 w-5 mr-2" />,
      value: "riskdashboard",
    },
    {
      label: "Case Studies",
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      value: "cases",
    },
    {
      label: "Risk Mitigation",
      icon: <ShieldCheck className="h-5 w-5 mr-2" />,
      value: "strategies",
    },
    {
      label: "Cost Estimator",
      icon: <DollarSign className="h-5 w-5 mr-2" />,
      value: "estimator",
    },
  ];

  const NavLink = ({ item }: { item: (typeof navItems)[0] }) => (
    <Link
      href={`
    ${item.value === "landing" ? "/" : `/${item.value}`}
    `}
    >
      <Button
        variant="destructive"
        className="flex items-center justify-start w-full md:w-auto"
      >
        {item.icon}
        <span>{item.label}</span>
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 navbar bg-base-100 shadow-sm z-999">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-xl">
            NPI<span className=" text-blue-600">RA</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <NavLink key={item.value} item={item} />
          ))}
          <div className="flex items-center space-x-2">
            <Button className="p-2 rounded-full border bg-gray-200 dark:bg-gray-800" variant="ghost" size="icon" onClick={() => toggleTheme()}>
              <span className="sr-only">Toggle theme</span>
              {theme === 'acid' ? <Sun className="h-6 w-6 text-yellow-500 fill-yellow-500" /> : <Moon className="h-6 w-6 text-gray-500 fill-gray-500" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}

        <Sheet>
          <SheetTrigger asChild className="flex md:hidden">
            <Button variant="ghost" size="default">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
          <div className="block sm:visible md:hidden">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="default" onClick={() => toggleTheme()}>
              <span className="sr-only">Toggle theme</span>
              <span className="h-4 w-4">🌓</span>
            </Button>
          </div>
          </div>
            <SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <NavLink key={item.value} item={item} />
                ))}
              </div>
            </SheetTitle>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
