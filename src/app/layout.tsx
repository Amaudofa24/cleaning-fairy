import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SHARED_METADATA, CleaningFairyJsonLd } from "@/seo";
import { BookingProvider, BookingModal } from "@/features/booking";
import { ThemeProvider } from "@/store/context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = SHARED_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cleaning_fairy_theme');
                  var root = document.documentElement;
                  if (theme === 'light') {
                    root.classList.add('light');
                    root.classList.remove('dark');
                    root.setAttribute('data-theme', 'light');
                    root.style.colorScheme = 'light';
                  } else {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.setAttribute('data-theme', 'dark');
                    root.style.colorScheme = 'dark';
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <ThemeProvider>
          <BookingProvider>
            <CleaningFairyJsonLd />
            {children}
            <BookingModal />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
