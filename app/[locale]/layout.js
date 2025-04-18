// Убираем 'use client'
// 'use client';

import { Unbounded, Pixelify_Sans } from "next/font/google";
import "./globals.css";
// Удаляем ненужные импорты
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import FontSwitcher from '../../components/FontSwitcher';

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  display: 'swap',
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  display: 'swap',
});

// Удаляем компонент LanguageSwitcher и его стили
/*
function LanguageSwitcher({ currentLocale }) { ... }
const styles = { ... };
*/

// RootLayout
export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <head>
        {/* Возвращаем явную ссылку на favicon, теперь она будет вести в /public/favicon.ico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Next.js добавит сюда метаданные из generateMetadata */}
      </head>
      <body className={`${unbounded.variable} ${pixelify.variable}`}>
        {/* Удаляем LanguageSwitcher отсюда */}
        {/* <LanguageSwitcher currentLocale={locale} /> */}
        <FontSwitcher />
        {children}
      </body>
    </html>
  );
}
