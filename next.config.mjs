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
  // The simple-icons root export is a barrel of ~3,500 icons.
  experimental: { optimizePackageImports: ['simple-icons'] },
  async redirects() {
    return [
      // The apex moved to connortessaro.dev. The old apex and www on either
      // spelling redirect there. One entry per host: `has.value` compiles
      // through path-to-regexp, which does not take an alternation group.
      ...[
        'www.connortessaro.dev',
        'connortesaro.dev',
        'www.connortesaro.dev',
      ].map((host) => ({
        source: '/:path*',
        has: [{ type: 'host', value: host }],
        destination: 'https://connortessaro.dev/:path*',
        permanent: true,
      })),
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
