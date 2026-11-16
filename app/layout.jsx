import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {site} from "../lib/site";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://purple-skunk-231017.hostingersite.com";
export const metadata={metadataBase:new URL(base),title:{default:"DNIC — Dot Net Interview Community",template:"%s | DNIC"},description:site.description,openGraph:{title:"DNIC — Dot Net Interview Community",description:site.description,siteName:site.name,type:"website"},robots:{index:false,follow:false}};
export default function RootLayout({children}){return <html lang="en"><body><Header/><main id="main-content">{children}</main><Footer/></body></html>}
