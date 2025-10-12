import type { Metadata } from "next";
import "./styles/globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Intela – Onlayn o‘quv platformasi | Zamonaviy bilim markazi",
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
  icons: {
    icon: "/logoo.png",
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
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Intela – O‘quv platformasi",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intela – Onlayn o‘quv platformasi",
    description:
      "Intela bilan zamonaviy kasblarni o‘rganing. Darslar, testlar va sertifikatlar — barchasi bir platformada.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <head>
        {/* Google Search Console uchun meta teg */}
        <meta
          name="google-site-verification"
          content="UGdzHh7wK83o3h33nCBdBmTeES_HEaVolZ4A8HnmK-I"
        />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
