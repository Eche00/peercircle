import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PeerCircle",
  description: "Organic social growth, engagement groups, and session coordination for creators.",
  icons: {
    icon: "/logo.png",
  },
  keywords: [
    "PeerCircle",
    "social media growth",
    "engagement groups",
    "Instagram followers boost",
    "organic growth tool",
    "creator coordination",
    "community-driven growth",
    "social media management",
  ],
};

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
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#191A1E",
              color: "#8F4AE3",
              border: "1px solid #8F4AE3",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#8F4AE3",
                secondary: "#191A1E",
              },
            },
            error: {
              iconTheme: {
                primary: "#8F4AE3",
                secondary: "#191A1E",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}


