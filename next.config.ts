import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {};

const withMDX = createMDX({
  options: {
    // Tables in case studies need GitHub-flavoured markdown
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
