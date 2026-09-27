import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./site-header";
import { siteUrl } from "./site-url";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const title = "Kingson Ezeruigbo — Machine learning for power systems";
const description =
  "Kingson Ezeruigbo builds machine learning models for power systems and real-world data. MSc Artificial Intelligence, National College of Ireland.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { title, description, url: "/", siteName: "Kingson Ezeruigbo", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0e1530",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
