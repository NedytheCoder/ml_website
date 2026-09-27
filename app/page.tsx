import Link from "next/link";
import { FrequencyTrace } from "./frequency-trace";
import { links } from "./links";
import { projects } from "./projects";

export default function Home() {
  return (
    <>
      <main>
        <section aria-labelledby="intro" className="pt-12 sm:pt-20">
          <h1
            id="intro"
            className="wide font-extrabold leading-[0.95] tracking-[-0.01em] text-[clamp(2.6rem,9vw,6.75rem)]"
          >
            Kingson
            <br />
            Ezeruigbo
          </h1>
          <p className="mt-8 max-w-[34ch] text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug">
            I build machine learning models for power grids and messy real-world data.
          </p>
          <p className="mt-4 max-w-[60ch] text-muted">
            MSc Artificial Intelligence student at National College of Ireland, with a computer
            science degree behind me.
          </p>

          <figure className="mt-14 sm:mt-20">
            <FrequencyTrace />
            <figcaption id="trace-caption" className="mt-4 max-w-[68ch] text-base text-muted">
              When a generator trips, grid frequency drops to a low point, the nadir, before
              reserves pull it back. My main project asks whether a model can call that low point
              from the first half second. Illustration, not measured data.
            </figcaption>
          </figure>
        </section>

        <section id="work" aria-labelledby="work-heading" className="mt-24 sm:mt-32">
          <h2 id="work-heading" className="wide text-2xl font-bold">
            Selected work
          </h2>
          <ul className="mt-8">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-x-12 gap-y-3 border-t border-grid py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
              >
                <h3 className="semiwide text-[1.35rem] font-semibold leading-tight">
                  <Link href={`/work/${project.slug}`} className="hover:text-trace">
                    {project.title}
                  </Link>
                </h3>
                <div className="max-w-[64ch]">
                  <p>{project.summary}</p>
                  {project.finding && <p className="mt-4">{project.finding}</p>}
                  <p className="mt-4 text-base text-muted">{project.methods.join(", ")}</p>
                  <Link
                    href={`/work/${project.slug}`}
                    className="mt-4 inline-block text-base text-trace underline hover:decoration-2"
                  >
                    Read the case study
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="about"
          aria-labelledby="about-heading"
          className="mt-16 grid gap-x-12 gap-y-4 border-t border-grid pt-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <h2 id="about-heading" className="wide text-2xl font-bold">
            About
          </h2>
          <div className="max-w-[64ch] space-y-4">
            <p>
              I came to machine learning through computer science and stayed for the problems where
              the data is physical: electricity grids, markets, materials. I care about the
              foundations, and about reporting what a model actually does, including when a
              simpler one does just as well.
            </p>
            <p>
              I’m working toward machine learning engineering, and this site grows with each
              project I finish.
            </p>
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mt-16 grid gap-x-12 gap-y-4 border-t border-grid pt-16 pb-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <h2 id="contact-heading" className="wide text-2xl font-bold">
            Contact
          </h2>
          <ul className="space-y-2">
            <li>
              <a href={`mailto:${links.email}`} className="text-trace underline hover:decoration-2">
                {links.email}
              </a>
            </li>
            <li>
              <a href={links.cv} className="text-trace underline hover:decoration-2">
                CV (PDF)
              </a>
            </li>
            <li>
              <a href={links.linkedin} className="text-trace underline hover:decoration-2">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={links.github} className="text-trace underline hover:decoration-2">
                GitHub
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
