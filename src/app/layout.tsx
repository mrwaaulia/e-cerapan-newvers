import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "e-Cerapan | Direktorat Metrologi",
    template: "%s | e-Cerapan",
  },
  description:
    "Layanan digital Direktorat Metrologi untuk mendukung pemeriksaan dan pengujian alat ukur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${poppins.variable} min-h-full antialiased`}>
      <body className="flex min-h-screen flex-col font-sans">{children}</body>
    </html>
  );
}
