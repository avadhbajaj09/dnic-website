import Link from "next/link";
import type { Book } from "../../lib/site";
export default function BookCard({ book }: { book: Book }) {
  return <article className="book-card">
    <Link href={"/books/" + book.slug + "/"} className="book-cover-link" aria-label={"Learn about " + book.title}>
      <div className={"book-cover cover-" + book.number}>
        <span className="cover-top">DNIC / THE INTERVIEW LIBRARY</span>
        <span className="cover-graphic" aria-hidden="true">{"{ }"}</span>
        <span className="cover-title">{book.title}</span>
        <span className="cover-author">NIRBHAY CHAUHAN</span>
      </div>
    </Link>
    <div className="book-card-meta"><span>{book.category}</span><span>№ {book.number}</span></div>
    <h3><Link href={"/books/" + book.slug + "/"}>{book.title}</Link></h3>
    <p>{book.subject}</p>
    <Link href={"/books/" + book.slug + "/"} className="text-link">Explore this book <span aria-hidden>↗</span></Link>
  </article>;
}
