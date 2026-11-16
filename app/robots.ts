import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/site";
export default function robots():MetadataRoute.Robots{
  const live=process.env.NEXT_PUBLIC_SITE_LIVE==="true";
  return {rules:live?[{userAgent:"*",allow:"/",disallow:["/api/"]}]:[{userAgent:"*",disallow:"/"}],sitemap:live?SITE_URL+"/sitemap.xml":undefined};
}
