import React from "react";
import MainLayout from "./components/MainLayout";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import CTASection from "./components/CTASection";

export const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeatureCards />
      <CTASection />
    </MainLayout>
  );
};
