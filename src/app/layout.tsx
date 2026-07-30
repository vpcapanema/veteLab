import type { Metadata, Viewport } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsappFloating } from "@/components/layout/whatsapp-floating";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/data/site";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "laboratório veterinário",
    "análises clínicas veterinárias",
    "Sinop MT",
    "banco de sangue canino",
    "exames pet",
    "hemograma cachorro",
    "hemograma gato",
    "veterinário Sinop",
  ],
  authors: [{ name: site.legal.companyName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.fullName,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.fullName,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1512" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sourceSans.variable} ${lora.variable}`}>
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <WhatsappFloating />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
