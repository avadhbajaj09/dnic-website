import Link from "next/link";
import BookCard from "./components/BookCard";
import { books, plans, SOCIAL } from "../lib/site";
export default function Home() {
  return <main>
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> DOT NET INTERVIEW COMMUNITY</p>
          <h1>Learn deeply.<br />Prepare <em>confidently.</em><br />Grow further.</h1>
          <p className="lead">Thoughtfully crafted interview books, practical video learning and personal resume services for the careers you're building.</p>
          <div className="button-row"><Link className="button button-dark" href="/books/">Explore our books <span aria-hidden>↗</span></Link><Link className="button button-outline" href="/resume-writing/">Resume services <span aria-hidden>↗</span></Link></div>
          <div className="hero-lower"><span>01 / 03</span><span>EDUCATION · PREPARATION · PROGRESSION</span></div>
        </div>
        <div className="hero-art" aria-label="DNIC book collection design preview">
          <div className="hero-art-top"><span>THE DNIC COLLECTION</span><span>EST. TO INSPIRE</span></div>
          <div className="hero-book back"><span>DOT NET<br />INTERVIEW<br />COMMUNITY</span><b>THE<br />CAREER<br />EDIT</b></div>
          <div className="hero-book front"><span>THE INTERVIEW EDITION</span><b>LEARN.<br />PREPARE.<br />GROW.</b><small>NIRBHAY CHAUHAN</small></div>
          <div className="hero-art-bottom"><span>IDEAS WORTH<br />TAKING FORWARD</span><span className="hero-star" aria-hidden="true">✳</span></div>
        </div>
      </div>
    </section>

    <section className="section section-intro">
      <div className="container split-intro"><div><p className="eyebrow">01 / ABOUT THE COMMUNITY</p><h2 className="display">Good careers begin with <em>better preparation.</em></h2></div><div><p className="body-large">DNIC brings together learning, interview preparation and professional development—designed to help people take their next step with clarity.</p><Link href="/about-dnic/" className="text-link">Discover the community ↗</Link></div></div>
    </section>

    <section className="section section-books" id="books">
      <div className="container">
        <div className="section-heading"><div><p className="eyebrow">02 / THE BOOK COLLECTION</p><h2 className="display">Made for the <em>next question.</em></h2><p className="section-description">Explore eight interview-focused titles by Nirbhay Chauhan. Discover a book here, then purchase through Amazon.</p></div><Link href="/books/" className="text-link">View all eight books ↗</Link></div>
        <div className="book-grid">{books.slice(0,4).map(book=><BookCard key={book.slug} book={book} />)}</div>
        <p className="fine-print">Preview typography is shown until official book cover files are supplied.</p>
      </div>
    </section>

    <section className="section section-feature">
      <div className="container feature-grid">
        <div className="feature-visual"><span>CAREER SERVICES / DNIC</span><div className="resume-paper"><div className="paper-title">THE NEXT<br />CHAPTER.</div><div className="paper-rule" /><div className="paper-lines"><i/><i/><i/><i/></div><span>PROFESSIONAL RESUME WRITING</span></div></div>
        <div className="feature-copy"><p className="eyebrow">03 / RESUME WRITING</p><h2 className="display">Your experience deserves <em>a clearer story.</em></h2><p className="body-large">A tailored resume can make your skills and experience easier to understand. Answer a few questions to discover the right service level.</p><div className="price-preview">{plans.map(plan=><div key={plan.name}><span>{plan.name}</span><strong>₹{plan.price.toLocaleString("en-IN")}</strong></div>)}</div><Link href="/resume-writing/get-started/" className="button button-dark">Find my resume plan ↗</Link></div>
      </div>
    </section>

    <section className="section section-video"><div className="container video-grid"><div><p className="eyebrow">04 / KEEP LEARNING</p><h2 className="display">The conversation <em>continues.</em></h2><p className="body-large">Visit our YouTube channel for videos and tutorials connected to the community's technical learning interests.</p><Link href="/videos/" className="text-link">Explore videos & tutorials ↗</Link></div><a className="video-poster" href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit Dot Net Interview Community on YouTube"><span>DNIC / VIDEO LEARNING</span><div className="play-disc">▶</div><strong>WATCH. LEARN.<br />KEEP GROWING.</strong><small>VISIT OUR YOUTUBE CHANNEL ↗</small></a></div></section>

    <section className="section section-founder"><div className="container founder-grid"><div className="founder-mark"><span>THE PERSON BEHIND DNIC</span><strong>NC.</strong><small>FOUNDER · AUTHOR</small></div><div><p className="eyebrow">05 / MEET THE AUTHOR</p><h2 className="display">Driven by knowledge.<br /><em>Led by purpose.</em></h2><p className="body-large">Meet Nirbhay Chauhan, the author behind the DNIC book collection and the person shaping the community's work.</p><Link href="/about-nirbhay-chauhan/" className="text-link">Meet Nirbhay Chauhan ↗</Link></div></div></section>

    <section className="section section-community"><div className="container community-panel"><div><p className="eyebrow eyebrow-light">06 / JOIN THE COMMUNITY</p><h2>Build your next chapter <em>with us.</em></h2></div><div><p>Follow Dot Net Interview Community for videos, announcements, conversations and new releases.</p><Link href="/community/" className="button button-cream">Connect with DNIC ↗</Link></div></div></section>
  </main>;
}
