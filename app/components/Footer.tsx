"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const footerLinks = {
  resources: [
    { name: "Case Studies", href: "/case-studies" },
    { name: "Methodology", href: "/methodology" },
    { name: "API Documentation", href: "/api-docs" },
  ],
  contact: [
    { name: "josh2engr+support@gmail.com", href: "mailto:josh2engr+support@gmail.com" },
    { name: "+49 (152) 3414-7360", href: "tel:+4915234147360" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Risk<span className="text-npira-blue">Analyzer</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              Empowering property risk assessment through advanced analytics
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full h-10 w-10"
              >
                <span className="sr-only">Toggle theme</span>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Resources</h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.resources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Contact</h4>
            {footerLinks.contact.map((item) => (
              <div key={item.href} className="flex items-center space-x-2">
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RiskAnalyzer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
