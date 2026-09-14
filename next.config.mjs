import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // The OG routes read these at runtime, which tracing cannot infer.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./assets/fonts/**'],
    '/work/[slug]/opengraph-image': ['./assets/fonts/**'],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
