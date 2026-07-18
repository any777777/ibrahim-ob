import type { Metadata } from "next";
import { Crimson_Text, Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim-ob.vercel.app"),
  title: "إبراهيم عبيدات | تصميم واستضافة وإدارة المواقع في الأردن",
  description: "أصمم وأستضيف وأدير مواقع الأعمال في الأردن من الفكرة إلى التشغيل، مع أسعار واضحة وتواصل مباشر عبر واتساب.",
  applicationName: "Ibrahim Obaidat Portfolio",
  authors: [{ name: "Ibrahim Obaidat" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "إبراهيم عبيدات | موقعك جاهز من الفكرة إلى التشغيل",
    description: "تصميم، استضافة وإدارة كاملة للمواقع في الأردن.",
    type: "website",
    locale: "ar_JO",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${crimsonText.variable}`}>
      <body>{children}</body>
    </html>
  );
}
