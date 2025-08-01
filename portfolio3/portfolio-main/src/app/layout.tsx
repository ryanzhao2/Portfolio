import "../styles/globals.css";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {gitlabmono, incognito} from "../assets/font/font";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import {Providers} from "./providers";
import {ReactNode} from "react";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--inter",
});

const options = {
    title: "Krish Patel",
    description:
        "My name is Krish Patel. I’m a Full Stack Software Developer passionate about building applications and solving problems.",
    url: "https://krishspatel.com",
    ogImage: "https://krishspatel.com/logo.png",
};

export const metadata: Metadata = {
    title: options.title,
    metadataBase: new URL(options.url),
    description: options.description,
    openGraph: {
        title: options.title,
        url: options.url,
        siteName: "krishspatel.com",
        locale: "en-US",
        type: "website",
        description: options.description,
        images: options.ogImage,
    },
    alternates: {
        canonical: options.url,
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
            <Navbar/>
            {children}
            <Footer/>
        </Providers>
        </body>
        {/* <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      /> */}
        </html>
    );
}
