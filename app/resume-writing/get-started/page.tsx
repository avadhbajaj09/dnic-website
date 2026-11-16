"use client";
import { useState } from "react";
import Link from "next/link";
import { recommendPlan } from "../../../lib/site";

type Field = "stage" | "experience" | "role" | "existing" | "goal";
type Answers = Record<Field, string>;
const questions: Array<{ field: Field; question: string; hint: string; choices: string[] }> = [
  { field: "stage", question: "Where are you in your career?", hint: "Choose what best describes your current stage.", choices: ["Student", "Fresher", "Working professional", "Career switcher"] },
  { field: "experience", question: "How much work experience do you have?", hint: "Include your total full-time professional experience.", choices: ["0-1", "2-5", "6-10", "10+"] },
  { field: "role", question: "What kind of role are you targeting?", hint: "This helps Nirbhay tailor the resume to your goals.", choices: ["Software developer", "QA / software testing", "Cloud / data", "Management / leadership", "Other"] },
  { field: "existing", question: "Do you already have a resume?", hint: "We can create a new one or improve your existing document.", choices: ["Yes, improve my resume", "No, create a new resume"] },
  { field: "goal", question: "What's your next career goal?", hint: "Choose the outcome that matters most.", choices: ["First job", "Switch jobs", "Career growth", "Leadership role", "Career transition"] },
];
const initial:Answers = { stage:"", experience:"", role:"", existing:"", goal:"" };
export default function ResumeAssessment(){
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState<Answers>(initial);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("");
  const [consent,setConsent]=useState(false);
  const [honeypot,setHoneypot]=useState("");
  const [submitting,setSubmitting]=useState(false);
  const [error,setError]=useState("");
  const [reference,setReference]=useState("");
  const plan=recommendPlan(answers.experience,answers.goal==="Leadership role");
  const current=questions[step];
  const isLast=step===questions.length;
  const finished=Boolean(reference);
  function goNext(){
    if(!isLast && answers[current.field]){setStep(s=>s+1);setError("");}
  }
  async function submit(){
    setError("");
    if(!name.trim()||!email.trim()||!consent){setError("Please provide your name, email and consent before submitting.");return;}
    setSubmitting(true);
    try{
      const response=await fetch("/api/resume",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...answers,name,email,phone,consent,website:honeypot})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||"We couldn't send your enquiry. Please try again.");
      setReference(result.reference);
    }catch(e){setError(e instanceof Error?e.message:"Sorry, something went wrong.");}
    finally{setSubmitting(false);}
  }
  return <main><section className="page-hero"><div className="container"><p className="eyebrow">DNIC / RESUME SERVICES</p><h1 className="display">Tell us about <em>your next step.</em></h1><p className="body-large">A few short questions. A clear recommended package. No account needed.</p></div></section>
    <section className="page-content"><div className="container"><div className="form-shell">
      {!finished&&<><div className="form-progress" aria-label={"Assessment progress: "+Math.round((step/6)*100)+"%"}><div style={{width:Math.round((step/6)*100)+"%"}}/></div><p className="eyebrow">STEP {String(Math.min(step+1,6)).padStart(2,"0")} OF 06</p></>}
      {finished?<div className="wizard-card"><p className="eyebrow">REQUEST RECEIVED</p><h2>Thank you, {name.trim()}.</h2><p>Your resume enquiry has been sent. Check your inbox for the document checklist and payment instructions.</p><div className="price-box"><p>REFERENCE</p><strong style={{fontSize:25}}>{reference}</strong><p>{plan.name} · ₹{plan.price.toLocaleString("en-IN")}</p></div><p className="muted-note">Payment is never automatically confirmed. Nirbhay ji will manually verify the transaction and manage the next steps through email.</p><Link className="button button-dark" href="/">Back to DNIC ↗</Link></div>:
      <div className="wizard-card">
        {!isLast?<><h2>{current.question}</h2><p>{current.hint}</p><div className="wizard-choice-grid">{current.choices.map(choice=><button type="button" key={choice} aria-pressed={answers[current.field]===choice} className={"wizard-choice"+(answers[current.field]===choice?" selected":"")} onClick={()=>setAnswers(a=>({...a,[current.field]:choice}))}>{choice==="0-1"?"0–1 year":choice==="2-5"?"2–5 years":choice==="6-10"?"6–10 years":choice==="10+"?"10+ years":choice}</button>)}</div>
          {step>=1&&<div className="callout"><span className="badge-text">Estimated plan</span><p style={{marginBottom:0}}><strong>{plan.name} — ₹{plan.price.toLocaleString("en-IN")}</strong></p></div>}
          <div className="wizard-actions"><button className="button button-outline" type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}>← Back</button><button className="button button-dark" type="button" disabled={!answers[current.field]} onClick={goNext}>Continue →</button></div>
        </>:<>
          <p className="eyebrow">YOUR RECOMMENDED PLAN</p><h2>One more thing.</h2><div className="price-box"><span>{plan.name}</span><strong>₹{plan.price.toLocaleString("en-IN")}</strong><p>Your quotation is based on the career information you selected.</p></div>
          <p>Where should we send your resume checklist and payment instructions?</p>
          <label className="wizard-label" htmlFor="candidate-name">Full name *</label><input id="candidate-name" className="wizard-input" maxLength={100} autoComplete="name" value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name"/>
          <label className="wizard-label" htmlFor="candidate-email">Email address *</label><input id="candidate-email" className="wizard-input" type="email" maxLength={200} autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
          <label className="wizard-label" htmlFor="candidate-phone">Phone number (optional)</label><input id="candidate-phone" className="wizard-input" maxLength={20} type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your contact number"/>
          <div className="hidden-field" aria-hidden="true"><label htmlFor="company-website">Website</label><input id="company-website" value={honeypot} tabIndex={-1} autoComplete="off" onChange={e=>setHoneypot(e.target.value)}/></div>
          <label style={{display:"flex",gap:12,alignItems:"flex-start",fontSize:12,lineHeight:1.7}}><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>I agree to be contacted by email about this resume enquiry and understand my information will be sent to DNIC. <Link href="/privacy-policy/" style={{textDecoration:"underline"}}>Privacy policy</Link>.</span></label>
          {error&&<p className="wizard-error" role="alert">{error}</p>}
          <div className="wizard-actions"><button className="button button-outline" type="button" onClick={()=>setStep(4)}>← Back</button><button className="button button-dark" type="button" disabled={submitting||!consent} onClick={submit}>{submitting?"Sending…":"Submit enquiry ↗"}</button></div>
          <p className="muted-note">Only one automated email will be sent with your plan, required documents and approved UPI QR code. All further communication is manual.</p>
        </>}
      </div>}
    </div></div></section>
  </main>;
}
