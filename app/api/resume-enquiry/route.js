import {NextResponse} from 'next/server';
import {packages,recommendedPackage,money} from '../../../lib/site';
export const runtime='nodejs';
const stages=['Student','Fresher / Entry level','Working professional','Career switcher'];
const experienceOptions=['0–1 year','2–5 years','6–10 years','10+ years'];
const roles=['Software Development','QA / Testing','Data / Cloud','Leadership / Management','Other'];
const goals=['My first job','Changing jobs','Career advancement','Switching career paths'];
const resumeOptions=['Yes, improve my resume','No, create a new resume'];
const mailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const recent=new Map();
function safe(value){return String(value??'').trim().replace(/[<>]/g,'').slice(0,255)}
function escapeHtml(value){return safe(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')}
function response(error,status=400){return NextResponse.json({error},{status,headers:{'Cache-Control':'no-store'}})}
export async function POST(request){
 let input;try{input=await request.json()}catch{return response('Invalid submission.');}
 const {careerStage,experience,targetRole,existingResume,careerGoal,consent}=input||{};
 const name=safe(input?.name),email=safe(input?.email).toLowerCase(),phone=safe(input?.phone),honeypot=safe(input?.website);
 if(honeypot)return NextResponse.json({ok:true});
 if(!stages.includes(careerStage)||!experienceOptions.includes(experience)||!roles.includes(targetRole)||!resumeOptions.includes(existingResume)||!goals.includes(careerGoal)||!name||name.length<2||!mailPattern.test(email)||phone.length>20||consent!==true)return response('Please check your answers and contact information.');
 if(!process.env.RESEND_API_KEY||!process.env.RESUME_FROM_EMAIL||!process.env.RESUME_NOTIFY_EMAIL||!process.env.RESUME_REPLY_TO||!process.env.PAYMENT_QR_URL)return response('The resume enquiry service is being configured. Please try again after the official payment details are published.',503);
 let qr;try{qr=new URL(process.env.PAYMENT_QR_URL);if(qr.protocol!=='https:')throw new Error('Not HTTPS')}catch{return response('Payment QR is not yet configured.',503)}
 const originIp=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'anonymous';const now=Date.now();for(const [k,v] of recent){if(now-v>600000)recent.delete(k)}const rateKey=originIp.slice(0,80);if(recent.has(rateKey))return response('Please wait a few minutes before submitting another enquiry.',429);
 recent.set(rateKey,now);
 const pkg=recommendedPackage(careerStage,experience,targetRole);const ref=`DNIC-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomUUID().slice(0,6).toUpperCase()}`;
 const rows=[['Career stage',careerStage],['Experience',experience],['Target role',targetRole],['Existing resume',existingResume],['Career goal',careerGoal],['Package',pkg.name],['Amount',money(pkg.price)]];
 const docs=['Full name, contact details and preferred location for the resume','Educational qualifications, institutions and graduation years','Technical and professional skills','Work experience, employers, dates and responsibilities (if applicable)','Internships, projects and measurable achievements','Certifications or relevant training','Target job role and preferred industry','Existing resume, if you have one','LinkedIn or portfolio link, if available'];
 const baseStyle='font-family:Arial,Helvetica,sans-serif;color:#24362f;line-height:1.7;max-width:620px;margin:auto';
 const qrUrl=escapeHtml(qr.toString());const amount=money(pkg.price);
 const candidateHtml=`<div style="${baseStyle}"><p style="letter-spacing:3px;font-size:12px">DNIC / DOT NET INTERVIEW COMMUNITY</p><h1 style="font-family:Georgia,serif;font-weight:400">Your resume enquiry</h1><p>Hi ${escapeHtml(name)},</p><p>Thank you for contacting DNIC. Based on your answers, we recommend <b>${escapeHtml(pkg.name)}</b>.</p><p><b>Reference:</b> ${ref}<br/><b>Quoted package:</b> ${escapeHtml(pkg.name)}<br/><b>Resume fee:</b> ${escapeHtml(amount)}</p><h2 style="font-family:Georgia,serif;font-weight:400">Payment instructions</h2><p>Scan Nirbhay Chauhan's authorized UPI payment QR below and pay <b>${escapeHtml(amount)}</b>. Please verify the UPI recipient name in your payment app before paying. Reply to this email with your transaction reference/UTR and the documents below.</p><p><img src="${qrUrl}" alt="Official DNIC resume service payment QR" width="225" height="225" style="max-width:225px;height:auto"/></p><p><a href="${qrUrl}">Open payment QR</a></p><h2 style="font-family:Georgia,serif;font-weight:400">What we need from you</h2><ol>${docs.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ol><p>Please reply directly to this email with the information. Do not send Aadhaar, PAN, bank statements or other unnecessary sensitive documents.</p><p><b>Important:</b> Payment is verified manually. Submitting a payment reference does not confirm payment; resume work begins only after Nirbhay personally verifies receipt.</p><p>Warm regards,<br/><b>Dot Net Interview Community</b></p></div>`;
 const adminHtml=`<div style="${baseStyle}"><h2>New DNIC resume enquiry</h2><p><b>Reference:</b> ${ref}<br/><b>Name:</b> ${escapeHtml(name)}<br/><b>Email:</b> ${escapeHtml(email)}<br/><b>Phone:</b> ${escapeHtml(phone)||'Not provided'}</p><table cellpadding="7" cellspacing="0" border="1" style="border-collapse:collapse">${rows.map(([key,value])=>`<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`).join('')}</table><p>Manual next steps: check incoming payment, request any missing documents by email, create and deliver the resume. No payment is confirmed automatically.</p></div>`;
 const payload=[{from:process.env.RESUME_FROM_EMAIL,to:[email],reply_to:process.env.RESUME_REPLY_TO,subject:`DNIC Resume Plan — ${pkg.name} (${amount}) | ${ref}`,html:candidateHtml},{from:process.env.RESUME_FROM_EMAIL,to:[process.env.RESUME_NOTIFY_EMAIL],reply_to:email,subject:`New Resume Enquiry — ${escapeHtml(name)} | ${ref}`,html:adminHtml}];
 try{const result=await fetch('https://api.resend.com/emails/batch',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});if(!result.ok){recent.delete(rateKey);return response('Unable to send the enquiry emails right now. Please try again.',502)}return NextResponse.json({ok:true,reference:ref,package:pkg.name,amount:pkg.price},{headers:{'Cache-Control':'no-store'}})}catch{recent.delete(rateKey);return response('Email service is temporarily unavailable. Please try again.',502)}
}
