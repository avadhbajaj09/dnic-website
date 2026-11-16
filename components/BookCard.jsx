import Link from "next/link";
import {site} from "../lib/site";
export default function BookCard({book, index=0}){
 return <article className="book-card">
  <Link href={`/books/${book.slug}/`} className={`book-cover book-${book.color}`} aria-label={`Explore ${book.title}`}>
   <span className="cover-series">DNIC / INTERVIEW LIBRARY</span><span className="cover-mark">⌘</span>
   <strong>{book.title}</strong><span className="cover-author">NIRBHAY CHAUHAN</span>
  </Link>
  <div className="book-info"><span className="eyebrow">{book.label}</span><h3><Link href={`/books/${book.slug}/`}>{book.title}</Link></h3><p>{book.summary}</p>
   <div className="book-actions"><Link href={`/books/${book.slug}/`} className="text-link">Explore title <span aria-hidden="true">↗</span></Link>{book.amazonUrl ? <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer sponsored" className="text-link">Buy on Amazon ↗</a> : <a href={site.amazonAuthor} target="_blank" rel="noopener noreferrer" className="text-link muted">Author store ↗</a>}</div>
  </div>
 </article>;
}
