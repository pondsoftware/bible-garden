import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Bible Garden — Read, Search & Explore the KJV Bible Online",
    template: "%s — Bible Garden",
  },
  description:
    "Read, search, and explore the King James Version Bible online. Browse all 66 books, 1,189 chapters, and 31,102 verses. Discover Bible verses by topic.",
  metadataBase: new URL("https://biblegarden.net"),
  openGraph: {
    type: "website",
    siteName: "Bible Garden",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-K7FMZ8XELQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K7FMZ8XELQ');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <header className="bg-primary text-white shadow-md">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-90 transition-opacity">
              <span className="text-2xl">🌿</span>
              <span>Bible Garden</span>
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-green-200 transition-colors hidden sm:block">
                Home
              </Link>
              <Link href="/topics" className="hover:text-green-200 transition-colors">
                Topics
              </Link>
              <Link href="/search" className="hover:text-green-200 transition-colors">
                Search
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-primary-dark text-green-100 mt-12">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-white mb-3">Bible Garden</h3>
                <p className="text-sm text-green-200 leading-relaxed">
                  Read, search, and explore the King James Version Bible online.
                  All 66 books, 1,189 chapters, and 31,102 verses at your fingertips.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">Quick Links</h3>
                <ul className="text-sm space-y-1">
                  <li><Link href="/genesis" className="hover:text-white transition-colors">Genesis</Link></li>
                  <li><Link href="/psalms" className="hover:text-white transition-colors">Psalms</Link></li>
                  <li><Link href="/matthew" className="hover:text-white transition-colors">Matthew</Link></li>
                  <li><Link href="/john" className="hover:text-white transition-colors">John</Link></li>
                  <li><Link href="/romans" className="hover:text-white transition-colors">Romans</Link></li>
                  <li><Link href="/revelation" className="hover:text-white transition-colors">Revelation</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">Our Tools</h3>
                <ul className="text-sm space-y-1">
                  <li><a href="https://appliancecalculator.net" className="hover:text-white transition-colors">Appliance Calculator</a></li>
                  <li><a href="https://freetaxcalc.com" className="hover:text-white transition-colors">Free Tax Calculator</a></li>
                  <li><a href="https://imagequickconvert.com" className="hover:text-white transition-colors">Image Quick Convert</a></li>
                  <li><a href="https://photometaviewer.com" className="hover:text-white transition-colors">Photo Meta Viewer</a></li>
                  <li><a href="https://freelancecalculator.net" className="hover:text-white transition-colors">Freelance Calculator</a></li>
                  <li><a href="https://socialresizer.com" className="hover:text-white transition-colors">Social Resizer</a></li>
                  <li><a href="https://printablepolly.com" className="hover:text-white transition-colors">Printable Polly</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-green-800 mt-8 pt-6 text-center text-sm text-green-300">
              <p>&copy; {new Date().getFullYear()} Bible Garden. King James Version — Public Domain.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
