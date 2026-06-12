import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EnoPaste — Developer Paste & Snippet Sharing",
    template: "%s | EnoPaste",
  },
  description:
    "Share code snippets, logs, and text with syntax highlighting, expiry, password protection, and burn-after-read. Built for developers.",
  keywords: [
    "pastebin",
    "code sharing",
    "snippet",
    "syntax highlighting",
    "developer tools",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "EnoPaste",
    title: "EnoPaste — Developer Paste & Snippet Sharing",
    description:
      "Share code snippets with syntax highlighting, expiry, and privacy controls.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnoPaste — Developer Paste & Snippet Sharing",
    description:
      "Share code snippets with syntax highlighting, expiry, and privacy controls.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
