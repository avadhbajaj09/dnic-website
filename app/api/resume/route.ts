import { NextRequest, NextResponse } from "next/server";
import { recommendPlan } from "../../../lib/site";

export const runtime = "nodejs";
const allowed = {
  stage: ["Student","Fresher","Working professional","Career switcher"],
  experience: ["0-1","2-5","6-10","10+"],
  role: ["Software developer","QA / software testing","Cloud / data","Management / leadership","Other"],
  existing: ["Yes, improve my resume","No, create a new resume"],
  goal: ["First job","Switch jobs","Career growth","Leadership role","Career transition"],
} as const;
const requests = new Map<string,{count:number;reset:number}>();
function esc(value:string){return value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]||char));}
function text(value:unknown,max=200){return typeof value==="string"?value.trim().slice(0,max):"";}
function validEmail(value:string){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length<=200;}
function error(message:string,status:number){return NextResponse.json({error:message},{status});}
export async function POST(request:NextRequest){
  if((request.headers.get("content-type")||"").split(";")[0]!=="application/json")return error("Invalid request.",415);
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const now=Date.now();
  if(requests.size>5000)for(const [key,val] of requests){if(val.reset<now)requests.delete(key);}
  const bucket=requests.get(ip)||{count:0,reset:now+60000};
  if(bucket.reset<now){bucket.count=0;bucket.reset=now+60000;}
  bucket.count++;requests.set(ip,bucket);
  if(bucket.count>6)return error("Too many requests. Please try again in a minute.",429);
  const raw=await request.text();
  if(raw.length>10000)return error("Request too large.",413);
  let body:Record<string,unknown>;
  try{body=JSON.parse(raw);}catch{return error("Invalid form details.",400);}
  if(text(body.website))return NextResponse.json({reference:"DNIC-RECEIVED"});
  const name=text(body.name,100),email=text(body.email),phone=text(body.phone,20);
  if(name.length<2||!validEmail(email)||body.consent!==true)return error("Please provide a valid name, email address and consent.",400);
  for(const key of Object.keys(allowed) as Array<keyof typeof allowed>){
    if(!(allowed[key] as readonly string[]).includes(text(body[key])))return error("Please complete all career questions.",400);
  }
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.RESUME_FROM_EMAIL;
  const notify=process.env.RESUME_TO_EMAIL;
  const qr=process.env.PAYMENT_QR_URL;
  if(!apiKey||!from||!notify||!qr||!qr.startsWith("https://"))
    return error("Resume enquiries are being configured. Please check back shortly.",503);
  const plan=recommendPlan(text(body.experience),text(body.goal)==="Leadership role");
  const reference="DNIC-"+Date.now().toString(36).toUpperCase()+"-"+crypto.randomUUID().slice(0,6).toUpperCase();
  const details=(Object.keys(allowed) as Array<keyof typeof allowed>).map(key=>"<li><strong>"+esc(key)+":</strong> "+esc(text(body[key]))+"</li>").join("");
  const checklist=["Full name and contact information for your resume","Education and qualifications","Technical and professional skills","Employment history and responsibilities, if applicable","Internships, projects and measurable achievements","Certifications, if applicable","Target job role and preferred industry","Existing resume, if available","LinkedIn or portfolio link, if available"].map(item=>"<li>"+item+"</li>").join("");
  const header="<div style='max-width:620px;margin:auto;padding:28px;color:#162b31;font-family:Arial,sans-serif;line-height:1.65'><h1>DNIC · Dot Net Interview Community</h1>";
  const candidateHtml=header+"<h2>Thank you, "+esc(name)+"!</h2><p>Your reference is <strong>"+esc(reference)+"</strong>.</p><p>Recommended plan: <strong>"+esc(plan.name)+"</strong><br>Resume fee: <strong>₹"+plan.price.toLocaleString("en-IN")+"</strong></p><h3>Payment instructions</h3><p>Scan Nirbhay ji's approved UPI QR code and pay the amount above. After payment, reply to this email with your UPI transaction reference. Nirbhay ji will verify payment manually before beginning the work.</p><p><img src='"+esc(qr)+"' alt='DNIC payment QR code' style='width:220px;max-width:100%;height:auto'></p><p>If your email client blocks images, <a href='"+esc(qr)+"'>open the payment QR here</a>.</p><h3>Information we need</h3><ol>"+checklist+"</ol><p>Reply to this email with these details and any existing resume. Please do not send identity documents or unrelated sensitive data.</p><p>All further communication is handled personally by Nirbhay ji through email.</p></div>";
  const adminHtml=header+"<h2>New resume enquiry: "+esc(reference)+"</h2><p><strong>Name:</strong> "+esc(name)+"<br><strong>Email:</strong> "+esc(email)+"<br><strong>Phone:</strong> "+esc(phone||"Not provided")+"</p><p><strong>Package:</strong> "+esc(plan.name)+"<br><strong>Price:</strong> ₹"+plan.price.toLocaleString("en-IN")+"</p><ul>"+details+"</ul><p>Candidate has received the initial QR and document-checklist email. Manually verify any payment and continue by replying to the candidate.</p></div>";
  try{
    const result=await fetch("https://api.resend.com/emails/batch",{method:"POST",headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json"},body:JSON.stringify([
      {from,to:[email],reply_to:notify,subject:"Your DNIC Resume Plan & Payment Details — "+reference,html:candidateHtml},
      {from,to:[notify],reply_to:email,subject:"New DNIC Resume Enquiry — "+name+" — "+reference,html:adminHtml}
    ]),signal:AbortSignal.timeout(15000)});
    if(!result.ok){console.error("DNIC email service returned non-success status",result.status);return error("Your enquiry could not be emailed. Please try again shortly.",502);}
    return NextResponse.json({reference,plan:plan.name,price:plan.price});
  }catch{console.error("DNIC resume email delivery failed");return error("Email service temporarily unavailable. Please try again.",502);}
}
