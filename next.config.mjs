import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const basePathFromEnv = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePathFromEnv ? basePathFromEnv : undefined,
  assetPrefix: basePathFromEnv ? basePathFromEnv : undefined,
};

export default withMDX(config);
