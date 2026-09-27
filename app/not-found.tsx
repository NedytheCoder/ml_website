import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Kingson Ezeruigbo",
};

export default function NotFound() {
  return (
    <main className="pb-24 pt-12 sm:pt-20">
      {/* A trace that loses its signal: flat, then drops out of the frame */}
      <svg
        viewBox="0 0 600 150"
        className="h-auto w-full max-w-xl"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="signal-lost" gradientUnits="userSpaceOnUse" x1="0" y1="50" x2="0" y2="146">
            <stop offset="0" stopColor="var(--trace)" />
            <stop offset="1" stopColor="var(--trace)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="0" y1="40" x2="600" y2="40" className="stroke-grid" strokeWidth="1" />
        <path
          d="M0 40 L220 40 C250 40 262 44 272 70 S288 130 292 146"
          pathLength={1}
          fill="none"
          stroke="url(#signal-lost)"
          className="trace-line"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <h1 className="wide mt-8 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02]">
        Page not found
      </h1>
      <p className="mt-6 max-w-[48ch]">
        There&apos;s nothing at this address. The link may be wrong, or the page may have moved.
      </p>
      <ul className="mt-8 space-y-2">
        <li>
          <Link href="/" className="text-trace underline hover:decoration-2">
            Go to the home page
          </Link>
        </li>
        <li>
          <Link href="/#work" className="text-trace underline hover:decoration-2">
            See my work
          </Link>
        </li>
      </ul>
    </main>
  );
}
