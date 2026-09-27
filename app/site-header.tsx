import Link from "next/link";
import { links } from "./links";

export function SiteHeader() {
  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6 text-base">
      <Link href="/" className="semiwide font-semibold no-underline">
        Kingson Ezeruigbo
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-6 text-muted">
          <li><Link href="/#work" className="hover:text-ink">Work</Link></li>
          <li><Link href="/#about" className="hover:text-ink">About</Link></li>
          <li><Link href="/#contact" className="hover:text-ink">Contact</Link></li>
          <li><a href={links.cv} className="hover:text-ink">CV</a></li>
        </ul>
      </nav>
    </header>
  );
}
