import Link from "next/link";
export default function Header(){return <header className="site-header"><div className="shell header-inner">
 <Link className="brand" href="/" aria-label="DNIC Home"><span className="brand-logo">dnic<span className="period">.</span></span><span className="brand-caption">DOT NET INTERVIEW<br/>COMMUNITY</span></Link>
 <nav className="nav-links" aria-label="Primary navigation"><Link href="/about-dnic/">About</Link><Link href="/books/">Books</Link><Link href="/videos/">Videos</Link><Link href="/community/">Community</Link><Link href="/contact/">Contact</Link></nav>
 <Link className="button button-dark header-cta" href="/resume-writing/get-started/">Build my resume <span aria-hidden="true">↗</span></Link>
 </div></header>;}
