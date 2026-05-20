import type { Metadata } from "next";
import "../styles/globals.css";
import { LanguageProvider } from "@/components/LanguageContext";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sehha-GIS · National Health Intelligence Layer for Jordan",
  description:
    "Bilingual EN/AR health intelligence dashboard for Jordan — capacity, surveillance, and specialist access maps built on Hakeem data. HAAC 2026 submission.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen bg-bg-primary text-text-primary">
        <LanguageProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col">
              <TopBar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
