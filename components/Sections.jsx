import Link from "next/link";
export function Eyebrow({children}){return <span className="eyebrow">{children}</span>}
export function PageIntro({eyebrow,title,lead}){return <section className="page-intro shell"><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1>{lead && <p className="page-lead">{lead}</p>}</section>}
export function BandCTA({eyebrow="YOUR NEXT STEP",title="Build what comes next.",text="From knowledge to opportunity, take the next step with a resume that reflects your experience.",href="/resume-writing/get-started/",cta="Find my resume plan"}){return <section className="band"><div className="shell band-inner"><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p></div><Link className="button button-light" href={href}>{cta} ↗</Link></div></section>}
