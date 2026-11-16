export const site = {
  name: "Dot Net Interview Community",
  shortName: "DNIC",
  description: "Books, technical interview preparation videos and thoughtful career services by the Dot Net Interview Community.",
  author: "Nirbhay Chauhan",
  amazonAuthor: "https://www.amazon.in/stores/Nirbhay-Chauhan/author/B0DV5KTJCF",
  youtube: "https://www.youtube.com/@DotNetInterviewCommunity",
  linkedin: "https://www.linkedin.com/company/dot-net-interview-community/",
  instagram: "https://www.instagram.com/dotnet_interview_community/",
  facebook: "https://www.facebook.com/DotNetInterviewCommunity/",
};
export const packages = [
  {name:"Career Starter", price:1000, experience:"0–1 year", blurb:"An intentional first step for students, freshers and entry-level candidates.", items:["ATS-conscious layout", "Projects, education and skills", "Focused one-page structure"]},
  {name:"Career Growth", price:2000, experience:"2–5 years", blurb:"Showcase your experience with greater clarity and stronger positioning.", items:["Career story and responsibilities", "Technical skills and outcomes", "Job-role alignment"]},
  {name:"Career Leadership", price:3000, experience:"6+ years", blurb:"Make significant experience and leadership impact easier to understand.", items:["Leadership and strategic impact", "Clear achievement storytelling", "Senior-career positioning"]},
];
export function recommendedPackage(careerStage, experience, targetRole) {
  if (targetRole === "Leadership / Management") return packages[2];
  if (["6–10 years", "10+ years"].includes(experience)) return packages[2];
  if (experience === "2–5 years") return packages[1];
  return packages[0];
}
export const money = (price) => `₹${price.toLocaleString("en-IN")}`;
