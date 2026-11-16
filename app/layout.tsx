import type { Metadata } from "next";
import Link from "next/link";
import { navigation, SOCIAL, SITE_URL } from "../lib/site";
import "./globals.css";

const isLive = process.env.NEXT_PUBLIC_SITE_LIVE === "true";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "DNIC — Dot Net Interview Community", template: "%s | DNIC" },
  description: "Dot Net Interview Community: interview preparation books by Nirbhay Chauhan, video tutorials, and professional resume writing services.",
  robots: { index: isLive, follow: isLive },
  openGraph: { type: "website", siteName: "Dot Net Interview Community", title: "DNIC — Dot Net Interview Community", description: "Learn. Prepare. Grow.", url: SITE_URL },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="announcement"><span className="status-dot" /> Official home of Dot Net Interview Community <span className="announcement-sep">·</span> Knowledge for the next step.</div>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="brand" aria-label="DNIC home">
              <span className="brand-mark">D<span>N</span>IC<span className="brand-period">.</span></span>
              <span className="brand-caption">DOT NET INTERVIEW<br />COMMUNITY</span>
            </Link>
            <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
            <Link className="button button-dark header-cta" href="/resume-writing/get-started/">Build my resume <span aria-hidden>↗</span></Link>
          </div>
        </header>
        {children}
        <footer className="footer">
          <div className="container footer-grid">
            <div><Link href="/" className="footer-brand">DNIC<span>.</span></Link><p>A home for technical interview preparation, published knowledge, and thoughtful career progress.</p><span className="footer-small">Founded by Nirbhay Chauhan</span></div>
            <div><h3>Explore</h3><Link href="/books/">Our books</Link><Link href="/resume-writing/">Resume services</Link><Link href="/videos/">Videos & tutorials</Link><Link href="/reviews/">Reader reviews</Link></div>
            <div><h3>Community</h3><Link href="/about-dnic/">About DNIC</Link><Link href="/about-nirbhay-chauhan/">Meet Nirbhay</Link><Link href="/community/">Join the community</Link><Link href="/contact/">Contact</Link></div>
            <div><h3>Find us</h3><a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">YouTube ↗</a><a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div>
          </div>
          <div className="container footer-bottom"><span>© {new Date().getFullYear()} Dot Net Interview Community. All rights reserved.</span><div><Link href="/privacy-policy/">Privacy</Link><Link href="/terms-and-conditions/">Terms</Link><Link href="/resume-service-policy/">Resume policy</Link><Link href="/amazon-disclosure/">Amazon disclosure</Link></div></div>
        </footer>
      </body>
    </html>
  );
}
