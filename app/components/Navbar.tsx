import React, { JSX } from "react";
import Link from "next/link";
import {
  Home,
  PieChart,
  BookOpen,
  ShieldCheck,
  DollarSign,
  Menu,
} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const Navbar = () => {
  const navItems: {
    label: string;
    icon: JSX.Element;
    value: "landing" | "dashboard" | "cases" | "strategies" | "estimator";
  }[] = [
    {
      label: "Home",
      icon: <Home className="h-5 w-5 mr-2" />,
      value: "landing",
    },
    {
      label: "Risk Dashboard",
      icon: <PieChart className="h-5 w-5 mr-2" />,
      value: "dashboard",
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
      <Button variant="destructive" className="flex items-center justify-start w-full md:w-auto">
        {item.icon}
        <span>{item.label}</span>
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
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
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="flex md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <NavLink key={item.value} item={item} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
