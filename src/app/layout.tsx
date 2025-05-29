'use client';

import "./globals.scss";
import "react-circular-progressbar/dist/styles.css";
import React from "react";

import type { Viewport } from "next";
import Script from "next/script";
import { UtmsProvider } from "@/contexts/UTMContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          // id="gtm"
          // dangerouslySetInnerHTML={{
          //   __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          // })(window,document,'script','dataLayer','GTM-MM4JM64');`,
          // }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <noscript>
          {/* <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MM4JM64"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe> */}
        </noscript>
        <UtmsProvider>
          {children}
        </UtmsProvider>
      </body>
    </html>
  );
}
