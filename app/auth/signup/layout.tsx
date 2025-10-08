import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://intela.uz"), // ✅ Fixes the warning
  title: {
    default: "Intela – Onlayn o‘quv platformasi | Zamonaviy bilim markazi",
    template: "%s | Intela",
  },
  description:
    "Intela — bu ingliz tili, dasturlash va zamonaviy kasblarni o‘rganish uchun mo‘ljallangan interaktiv onlayn o‘quv platforma. Darslar, testlar va sertifikatlar — barchasi bir joyda.",
  keywords: [
    "Intela",
    "onlayn o‘quv platforma",
    "ingliz tili kurslari",
    "dasturlash kurslari",
    "React JS",
    "Nest JS",
    "frontend",
    "backend",
    "onlayn ta’lim",
    "sertifikat",
    "kurslar",
  ],
  authors: [{ name: "Intela Team", url: "https://intela.uz" }],
  creator: "Intela Team",
  publisher: "Intela",
  icons: {
    icon: "/logoo.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "vq_Irp71kTVPuOptFw0MW0KDvASxIqLD7fb_LxoJvjY",
  },
  openGraph: {
    title: "Intela – Onlayn o‘quv platformasi",
    description:
      "Bilim olishni yangi bosqichga olib chiqing. Intela sizga interaktiv darslar, sinovlar va real sertifikatlar bilan o‘sish imkonini beradi.",
    url: "https://intela.uz",
    siteName: "Intela",
    locale: "uz_UZ",
    type: "website",
    images: [
      {
        url: "https://intela.uz/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Intela – O‘quv platformasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@intela_uz", // ✅ optional but improves indexing
    title: "Intela – Onlayn o‘quv platformasi",
    description:
      "Intela bilan zamonaviy kasblarni o‘rganing. Darslar, testlar va sertifikatlar — barchasi bir platformada.",
    images: ["https://intela.uz/og-image.jpg"],
  },
  alternates: {
    canonical: "https://intela.uz",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
