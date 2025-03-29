import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { metadata } from "./metadata";
import BotHandler from "./components/chatbot/botHandler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="acid"
      className="flex justify-center items-center min-h-screen"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>
          {String(metadata.title) ??
            "Nigerian Property Investment Risk Analyzer"}
        </title>
        <meta
          name="description"
          content={metadata.description ?? "Default description"}
        />
        <meta property="og:title" content={String(metadata.title)} />
        <meta
          property="og:description"
          content={metadata.description ?? "Default description"}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://npira.vercel.app" />
        <meta property="og:image" content="/npira_og-image.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <BotHandler />
        <Footer />
      </body>
    </html>
  );
}
