import type { Metadata } from "next";
import { Inter, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import SiteProvider from "@/components/SiteProvider";

const inter = Inter({ subsets: ["latin"] });
const nanumGothicCoding = Nanum_Gothic_Coding({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Daniel Herr Artist Portfolio",
  description: "A minimalistic artist portfolio showcasing creative work by Daniel Herr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nanumGothicCoding.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased`}>
        <SiteProvider>
          <div className="flex flex-col min-h-screen">
            <Nav />
            {children}
          </div>
        </SiteProvider>
      </body>
    </html>
  );
}
