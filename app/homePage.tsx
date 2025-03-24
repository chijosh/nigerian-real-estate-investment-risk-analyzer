import React from "react";
import Link from "next/link";
import { Button } from "./components/ui/button";
import { ChevronRight, Shield, FileText, BarChart3, Map } from "lucide-react";

export const HomePage = () => {
  return (
    <div className="hero flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Nigerian Property Investment Risk Analyzer
            </h1>
            <p className="max-w-[800px] text-gray-200 md:text-xl">
              Comprehensive analysis and risk assessment tools for Nigerian
              diasporans looking to invest in homeland property.
            </p>
            <div className="space-x-4">
              <Link href="/riskdashboard">
                <Button variant="default" size="lg">
                  Explore Risk Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <Shield className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold text-black">Risk Assessment</h3>
              <p className="text-center text-gray-500">
                Interactive risk dashboard showcasing legal, financial,
                logistical, and market risks in Nigerian property investment.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <FileText className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold text-black">Case Studies</h3>
              <p className="text-center text-gray-500">
                Real-world examples of both cautionary tales and success stories
                from diaspora investors.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <BarChart3 className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold text-black">Cost Estimation</h3>
              <p className="text-center text-gray-500">
                Interactive tool to estimate total investment costs including
                hidden fees and infrastructure expenses.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
              <Map className="h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-bold text-black">Regional Analysis</h3>
              <p className="text-center text-gray-500">
                Location-specific insights for major Nigerian regions and their
                unique investment landscapes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-black">
              Make Informed Investment Decisions
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl">
              Navigate the complex Nigerian property market with our
              comprehensive risk analysis tools.
            </p>
            <Link href="/login">
              <Button variant="destructive" size="lg">
                Get Started
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
