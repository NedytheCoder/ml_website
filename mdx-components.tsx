import type { MDXComponents } from "mdx/types";

// Prose styling for case studies and, later, writing
const components: MDXComponents = {
  h2: (props) => <h2 className="wide mt-16 mb-5 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="semiwide mt-10 mb-3 text-[1.35rem] font-semibold" {...props} />,
  p: (props) => <p className="mt-5" {...props} />,
  a: (props) => <a className="text-trace underline hover:decoration-2" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-muted" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-muted" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  code: (props) => (
    <code className="rounded-sm bg-paper px-1.5 py-0.5 text-[0.9em]" {...props} />
  ),
  table: (props) => (
    <div className="mt-8 overflow-x-auto">
      <table className="figures w-full min-w-[32rem] border-collapse text-base" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border-b border-grid px-3 py-2 text-left font-semibold first:pl-0" {...props} />
  ),
  td: (props) => <td className="border-b border-grid/60 px-3 py-2 first:pl-0" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
