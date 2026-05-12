import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UiStateProvider } from "@/components/ui-state-provider";

/*
  Fonts:
  Next.js optimizes fonts automatically. 
  Here we load Google Fonts (Geist) and store them in CSS variables
  so Tailwind can use them.
*/
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Dhain",
  description: "Personal Portfolio Webapp",
};

/*
  Layout Component:
  Wraps EVERY page.
  Uses UiStateProvider to manage global UI (Sidebars).
*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UiStateProvider>
          {/* 
              Main Content Wrapper:
            */}
          <div className="w-full">
            {children}
          </div>
        </UiStateProvider>
      </body>
    </html>
  );
}
