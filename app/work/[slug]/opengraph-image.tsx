import { previewSize, renderPreview } from "../../link-preview";
import { projects } from "../../projects";

export const alt = "Case study by Kingson Ezeruigbo";
export const size = previewSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  return renderPreview({
    kicker: "Case study by Kingson Ezeruigbo",
    title: project?.title ?? "Kingson Ezeruigbo",
    titleSize: 68,
  });
}
