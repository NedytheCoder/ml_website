import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  const title = `${project.title} | Kingson Ezeruigbo`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      url: `/work/${slug}`,
      siteName: "Kingson Ezeruigbo",
      type: "article",
    },
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const { default: Body } = await import(`@/content/work/${slug}.mdx`);

  return (
    <main className="pb-24">
      <article>
        <header className="pt-12 sm:pt-20">
          <Link href="/#work" className="text-base text-muted hover:text-ink">
            All work
          </Link>
          <h1 className="wide mt-6 max-w-[22ch] text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.02]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-[clamp(1.15rem,1.8vw,1.35rem)] leading-snug">
            {project.summary}
          </p>

          <dl className="mt-10 grid max-w-[68ch] gap-x-10 gap-y-1 border-t sm:gap-y-4 border-grid pt-6 text-base sm:grid-cols-[auto_1fr]">
            <dt className="text-muted">Methods</dt>
            <dd className="mb-4 sm:mb-0">{project.methods.join(", ")}</dd>
            <dt className="text-muted">Code</dt>
            <dd className="min-w-0">
              <a
                href={project.repo}
                className="text-trace underline [overflow-wrap:anywhere] hover:decoration-2"
              >
                {project.repo.replace("https://", "")}
              </a>
            </dd>
          </dl>
        </header>

        <div className="mt-8 max-w-[68ch]">
          <Body />
        </div>
      </article>
    </main>
  );
}
