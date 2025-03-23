"use client"

import { Button } from './ui/button'
import { Mail, Phone } from 'lucide-react'
import Link from "next/link";
import { useEffect, useState } from "react";


export const Footer = () => {
    const [theme, setTheme] = useState('light');
  
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
  
    useEffect(() => {
      const htmlElement = document.querySelector('html');
      if (htmlElement) {
        htmlElement.setAttribute('data-theme', theme);
      }
    }, [theme]);

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">RiskAnalyzer</h3>
            <p className="text-sm text-muted-foreground">
              Empowering property risk assessment through advanced analytics
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleTheme()}
              >
                <span className="sr-only">Toggle theme</span>
                <span className="h-4 w-4">🌓</span>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Resources</h4>
            <nav className="flex flex-col space-y-1">
              <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground">
                Case Studies
              </Link>
              <Link href="/methodology" className="text-sm text-muted-foreground hover:text-foreground">
                Methodology
              </Link>
              <Link href="/api-docs" className="text-sm text-muted-foreground hover:text-foreground">
                API Documentation
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Contact</h4>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">josh2engr+support@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">+49 (152) 3414-7360</span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Legal</h4>
            <nav className="flex flex-col space-y-1">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} RiskAnalyzer. All rights reserved.
        </div>
      </div>
    </footer>
  )
}