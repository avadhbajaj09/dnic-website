import type { MetadataRoute } from "next";
import { books, SITE_URL } from "../lib/site";
export default function sitemap():MetadataRoute.Sitemap{
  const paths=["","about-dnic","about-nirbhay-chauhan","books","resume-writing","resume-writing/get-started","videos","community","reviews","faq","contact","developer-interview-books","qa-interview-books","privacy-policy","terms-and-conditions","resume-service-policy","amazon-disclosure"];
  return [...paths,...books.map(b=>"books/"+b.slug)].map(path=>({url:SITE_URL+"/"+(path?path+"/":""),changeFrequency:path?"monthly":"weekly",priority:path?0.65:1}));
}
