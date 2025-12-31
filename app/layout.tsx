import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import Providers from "./Providers";
import ChatWidget from "./components/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Midas Technical Solutions - Premium Repair Parts",
  description: "Professional iPhone, Samsung, MacBook parts with 30-day warranty.",
  openGraph: {
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
