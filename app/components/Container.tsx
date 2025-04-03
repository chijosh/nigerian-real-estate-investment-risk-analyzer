"use client";

import { useEffect } from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
    </body>
  );
};

export default Container;
