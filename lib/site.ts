export const SITE_URL = "https://dnic.in";
export const AMAZON_AUTHOR_URL = "https://www.amazon.in/stores/Nirbhay-Chauhan/author/B0DV5KTJCF";
export const SOCIAL = {
  youtube: "https://www.youtube.com/@DotNetInterviewCommunity",
  linkedin: "https://www.linkedin.com/company/dot-net-interview-community/",
  instagram: "https://www.instagram.com/dotnet_interview_community/",
  facebook: "https://www.facebook.com/DotNetInterviewCommunity/",
};
export type Book = { slug: string; title: string; category: "Developer" | "QA & Testing"; subject: string; number: string; amazonUrl: string; };
/** Provisional book titles: confirm exact Amazon product titles, covers, and ASIN URLs before production. */
export const books: Book[] = [
  { slug: "master-dotnet-fundamentals", title: "Master .NET Fundamentals", category: "Developer", subject: ".NET fundamentals", number: "01", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "master-csharp-interview-preparation", title: "Master C# Interview Preparation", category: "Developer", subject: "C# interview preparation", number: "02", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "dotnet-developers-interview-toolkit", title: ".NET Developer's Interview Toolkit", category: "Developer", subject: "Developer interviews", number: "03", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "mastering-dotnet-core-interview", title: "Mastering the .NET Core Interview", category: "Developer", subject: "ASP.NET Core", number: "04", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "conquer-azure-developer-interview", title: "Conquer the Azure Developer Interview", category: "Developer", subject: "Azure development", number: "05", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "complete-front-end-interview-guide", title: "The Complete Front-End Interview Guide", category: "Developer", subject: "Front-end interviews", number: "06", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "software-testing-interview-secrets", title: "Software Testing Interview Secrets", category: "QA & Testing", subject: "Software testing", number: "07", amazonUrl: AMAZON_AUTHOR_URL },
  { slug: "advanced-qa-interview-handbook", title: "The Advanced QA Interview Handbook", category: "QA & Testing", subject: "Advanced QA", number: "08", amazonUrl: AMAZON_AUTHOR_URL },
];
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about-dnic/", label: "About DNIC" },
  { href: "/books/", label: "Books" },
  { href: "/videos/", label: "Videos" },
  { href: "/resume-writing/", label: "Resumes" },
  { href: "/community/", label: "Community" },
];
export const plans = [
  { name: "Career Starter", price: 1000, range: "0–1 year", desc: "A focused start for students, graduates and early-career applicants." },
  { name: "Career Growth", price: 2000, range: "2–5 years", desc: "Present professional experience, skills and achievements with clarity." },
  { name: "Career Leadership", price: 3000, range: "6+ years", desc: "Position extensive experience, impact and leadership responsibility." },
];
export function recommendPlan(experience: string, leadership = false) {
  if (leadership || experience === "6-10" || experience === "10+") return plans[2];
  if (experience === "2-5") return plans[1];
  return plans[0];
}
