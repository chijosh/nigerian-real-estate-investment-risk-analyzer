"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActionButton from "./FloatingActionButton";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}