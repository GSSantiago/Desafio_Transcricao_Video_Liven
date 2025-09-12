import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next";

import "@repo/ui/globals.css"

export const metadata: Metadata = {
  title: "Liven - Transcrição de video",
  description: "Transcreva seu video",
};

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body  className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        {children}
      </body>
    </html>
  );
}
