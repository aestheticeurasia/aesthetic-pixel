"use client";

import { Inter, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hiddenHeaderRoutes = ["/book-a-slot", "/studio-hire"];
  const isHeaderHidden = hiddenHeaderRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Aesthetic Pixel Studio LLC</title>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />

        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQHKVF8C');
            `,
          }}
        />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased bg-[url('/layoutComponents/redishBlur-top.svg')] bg-no-repeat bg-top-left bg-black`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MQHKVF8C"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          src="https://code.tidio.co/lqxoffpysbqlfrvvh6mouphj0rrzgyk4.js"
          strategy="afterInteractive"
        />

        {!isHeaderHidden && <Header />}

        <Toaster theme="dark" position="top-center" offset={35} />

        <main
          className={`${
            !isHome && !isHeaderHidden ? "pt-24" : ""
          } w-full min-h-[100vh]`}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
